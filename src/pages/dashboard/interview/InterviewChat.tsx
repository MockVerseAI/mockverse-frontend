import ConsentCard from "@/components/cards/ConsentCard";
import Message from "@/components/cards/Message";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import WaveformIcon from "@/components/WaveformIcon";
import { IMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewService from "@/services/interviewService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDeepgramTranscription } from "@/hooks/useDeepgramTranscription";
import { toast } from "sonner";
import DeepgramService from "@/services/deepgramService";
import { TooltipButton } from "@/components/ui/tooltip-button";

export default function InterviewChat() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [input, setInput] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const { id: interviewId = "" } = useParams();
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { data: deepgramKeyData, isError: isDeepgramKeyError } = useQuery({
    queryKey: ["deepgramKey", interviewId],
    queryFn: async () => {
      const res = await DeepgramService.get(interviewId);
      return res.data.data;
    },
    enabled: !!interviewId,
  });

  const { mutate: handleSend, isPending } = useMutation({
    mutationFn: ({ isFirst = false }: { isFirst?: boolean } = {}) => {
      if (!isFirst) {
        setMessages((prev) => [...prev, { content: input, role: "user" }]);
        setInput("");
        resetTranscript();
      }
      stopListening();
      return InterviewService.chat({ message: input, interviewId, isFirst });
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to send message");
    },
    onSuccess: async (response) => {
      const dataObj = response.data.data;
      if (Array.isArray(dataObj)) {
        setMessages(dataObj.map((item) => ({ role: item.role, content: item.content })));
      } else {
        const aiResponse = dataObj.content;
        if (aiResponse.includes("That concludes our interview")) {
          setTimeout(() => {
            endInterview();
          }, 5000);
        }
        if (dataObj.audio) {
          playAudioResponse(dataObj.audio);
        }
        setMessages((prev) => [...prev, { content: aiResponse, role: "assistant" }]);
      }
    },
  });

  // Create a speech end handler
  const handleUtteranceEnd = useCallback(
    (transcriptValue: string) => {
      const currentInput = transcriptValue.trim();
      if (currentInput) {
        handleSend({ isFirst: false });
      }
    },
    [handleSend]
  );

  // Use our custom Deepgram hook with the speech end handler
  const {
    transcript,
    resetTranscript,
    isSupported: browserSupportsTranscription,
    startListening,
    stopListening,
    isListening,
    error: transcriptionError,
  } = useDeepgramTranscription({
    onUtteranceEnd: handleUtteranceEnd,
  });

  // Update input field with transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Handle transcription errors
  useEffect(() => {
    if (transcriptionError) {
      toast.error(`Speech recognition error: ${transcriptionError}`);
      setIsVoiceMode(false);
      setIsSpeaking(false);
    }
  }, [transcriptionError]);

  // Handle Deepgram key fetch error
  useEffect(() => {
    if (isDeepgramKeyError) {
      toast.error("Failed to initialize voice transcription");
      setIsVoiceMode(false);
    }
  }, [isDeepgramKeyError]);

  // Stop listening when component unmounts or voice mode changes
  useEffect(() => {
    if (!isVoiceMode && isListening) {
      stopListening();
    }
    return () => {
      if (isListening) {
        stopListening();
      }
    };
  }, [isVoiceMode, isListening, stopListening]);

  const handleStart = useCallback(() => {
    setShowChat(true);
    handleSend({ isFirst: true });
  }, [handleSend]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Modify handleMicClick to handle voice mode changes more efficiently
  const handleMicClick = useCallback(() => {
    if (!isVoiceMode) {
      if (!browserSupportsTranscription) {
        toast.error("Your browser does not support voice recognition");
        return;
      }
      if (!deepgramKeyData?.key) {
        toast.error("Voice transcription is not available at the moment");
        return;
      }
      setIsVoiceMode(true);
      startListening(deepgramKeyData.key);
    } else {
      setIsVoiceMode(false);
      stopListening();
    }
  }, [browserSupportsTranscription, isVoiceMode, startListening, stopListening, deepgramKeyData]);

  const { mutate: endInterview, isPending: isEndInterviewPending } = useMutation({
    mutationFn: () => {
      if (isVoiceMode) {
        stopListening();
      }
      return InterviewService.end({ interviewId });
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to end interview");
    },
    onSuccess: async () => {
      navigate(`/dashboard/interview/report/${interviewId}`);
    },
  });

  // Fix playAudioBuffer reference - Replace with a new function if needed
  const playAudioResponse = useCallback(
    async (base64Audio: string) => {
      try {
        setIsSpeaking(true);
        stopListening();

        // Convert base64 to audio buffer
        const binaryString = window.atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create audio context
        const audioContext = new window.AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(bytes.buffer);

        // Create and play audio source
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);

        source.onended = () => {
          if (isVoiceMode) {
            startListening(deepgramKeyData?.key);
          }
          setIsSpeaking(false);
        };

        source.start(0);
      } catch (error) {
        console.error("Audio playback error:", error);
        toast.error("Failed to play audio response");
        setIsSpeaking(false);
      }
    },
    [deepgramKeyData?.key, isVoiceMode, startListening, stopListening]
  );

  if (!showChat) {
    return <ConsentCard onStart={handleStart} />;
  }

  return (
    <>
      <Button isLoading={isEndInterviewPending} onClick={() => endInterview()} className="fixed top-4 right-5">
        End Interview
      </Button>
      <div className="flex h-full flex-col items-center">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 w-full max-w-4xl flex-1 overflow-y-auto p-4"
            style={{ maxHeight: "calc(100vh - 150px)" }}
            ref={chatContainerRef}
          >
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {isPending ? (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="mb-4 flex justify-start"
              >
                <div className="bg-muted max-w-xs rounded-lg px-4 py-2 md:max-w-md lg:max-w-lg xl:max-w-xl">
                  <Loader className="size-5 animate-spin" />
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="mb-5 w-full">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <AutosizeTextarea
                value={input}
                disabled={isSpeaking}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend({ isFirst: false })}
                placeholder="Type your response..."
                className="bg-sidebar w-full rounded-lg border-none py-6 pr-24"
                maxHeight={200}
              />
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2">
                <TooltipButton title="Toggle Voice Mode">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleMicClick}
                    className={cn("rounded-full", isVoiceMode ? "bg-accent" : "")}
                  >
                    <WaveformIcon isActive={isVoiceMode} />
                  </Button>
                </TooltipButton>

                <Button disabled={input.trim().length === 0} size="icon" onClick={() => handleSend({ isFirst: false })}>
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
