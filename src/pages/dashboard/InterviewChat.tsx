import ConsentCard from "@/components/ConsetCard";
import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InterviewService from "@/services/interviewService";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, Mic, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

export default function InterviewChat() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const { id: interviewId = "" } = useParams();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const synth = useRef(window.speechSynthesis);

  const speakText = useCallback(async (text: string) => {
    try {
      synth.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      const voices = synth.current.getVoices();
      const englishVoice = voices.find((voice) => voice.lang.includes("en")) || voices[0];
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        toast.error("Failed to speak the response. Please ensure audio is enabled.");
      };

      synth.current.speak(utterance);
    } catch (error) {
      console.error("Speech synthesis error:", error);
      toast.error("Failed to initialize speech synthesis");
    }
  }, []);

  const { mutate: handleSend, isPending } = useMutation({
    mutationFn: ({ isFirst = false }: { isFirst?: boolean } = {}) => {
      if (!isFirst) {
        setMessages((prev) => [...prev, { text: input, isUser: true }]);
        setInput("");
      }
      return InterviewService.chat({ message: input, interviewId, isFirst });
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to send message");
    },
    onSuccess: async (response) => {
      const aiResponse = response.data.data.message;
      await speakText(aiResponse);
      setMessages((prev) => [...prev, { text: aiResponse, isUser: false }]);
    },
  });

  const handleStart = useCallback(() => {
    setShowChat(true);
    handleSend({ isFirst: true });
  }, [handleSend]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!showChat) {
    return <ConsentCard onStart={handleStart} />;
  }

  return (
    <div className="flex h-full flex-col items-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-4xl flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500"
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
              <div className="max-w-xs rounded-lg bg-muted px-4 py-2 md:max-w-md lg:max-w-lg xl:max-w-xl">
                <Loader className="size-5 animate-spin" />
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="mb-5 w-full">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend({ isFirst: false })}
              placeholder="Type your response..."
              className="w-full rounded-lg border-none bg-sidebar py-6"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <Button variant="ghost" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="icon" onClick={() => handleSend({ isFirst: false })}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
