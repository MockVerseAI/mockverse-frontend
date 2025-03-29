import { useCallback, useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, vapi } from "@/lib/utils";
import InterviewService from "@/services/interviewService";
import { RootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const InterviewAgent = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { id: interviewWorkspaceId = "", interviewId = "" } = useParams();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [agentVolumeLevel, setAgentVolumeLevel] = useState<number>(0);
  const navigate = useNavigate();

  const { mutate: startInterview, isPending } = useMutation({
    mutationFn: async () => {
      const res = await InterviewService.agent({ interviewId });
      return res?.data;
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to start interview");
    },
    onSuccess: async (response) => {
      const assistantId = response?.data?.assistantId;
      console.log(response);
      toast.success("Starting interview...");
      handleStartInterview(assistantId);
    },
  });

  const { mutate: endInterview, isPending: isEndInterviewPending } = useMutation({
    mutationFn: async () => {
      console.log("end-interview");
      const res = await InterviewService.endAgent({ interviewId, messages });
      return res?.data;
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to start interview");
    },
    onSuccess: async () => {
      toast.success("Interview ended successfully");
      navigate(`/dashboard/interview-workspace/${interviewWorkspaceId}/interview/report/${interviewId}`);
    },
  });

  const onCallStart = useCallback(() => {
    console.log("call-start");
    setCallStatus(CallStatus.ACTIVE);
  }, []);

  const onCallEnd = useCallback(() => {
    console.log("call-end");
    setCallStatus(CallStatus.FINISHED);
    endInterview();
  }, [endInterview]);

  const onMessage = useCallback((message: Message) => {
    if (message.type === "transcript" && message.transcriptType === "final") {
      const newMessage = { role: message.role, content: message.transcript };
      setMessages((prev) => [...prev, newMessage]);
    }
  }, []);

  const onSpeechStart = useCallback(() => {
    console.log("speech start");
  }, []);

  const onSpeechEnd = useCallback(() => {
    console.log("speech end");
  }, []);

  const onError = useCallback((error: Error) => {
    console.log("Error:", error);
  }, []);

  const onVolumeLevelChange = useCallback((volumeLevel: number) => {
    console.log("volume level", volumeLevel);
    setAgentVolumeLevel(volumeLevel);
  }, []);

  const setupVapiEvents = useCallback(() => {
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    vapi.on("volume-level", onVolumeLevelChange);
  }, [onCallEnd, onCallStart, onError, onMessage, onSpeechEnd, onSpeechStart, onVolumeLevelChange]);

  const cleanupVapiEvents = useCallback(() => {
    vapi.off("call-start", onCallStart);
    vapi.off("call-end", onCallEnd);
    vapi.off("message", onMessage);
    vapi.off("speech-start", onSpeechStart);
    vapi.off("speech-end", onSpeechEnd);
  }, [onCallEnd, onCallStart, onMessage, onSpeechEnd, onSpeechStart]);

  useEffect(() => {
    setupVapiEvents();

    return () => {
      cleanupVapiEvents();
    };
  }, [cleanupVapiEvents, setupVapiEvents]);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  const handleStartInterview = async (assistantId: string) => {
    vapi.start(assistantId);
    setCallStatus(CallStatus.CONNECTING);
  };

  const handleDisconnect = async () => {
    await vapi.stop();
    setCallStatus(CallStatus.FINISHED);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4 lg:px-10">
      <div className="grid w-full grid-cols-2 gap-8">
        <Card className="relative flex min-h-96 items-center justify-center">
          <motion.div
            animate={{ scale: 1 + agentVolumeLevel, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "bg-accent absolute top-1/2 left-1/2 z-10 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
              callStatus === CallStatus.CONNECTING && "animate-ping"
            )}
          />
          <Avatar className="relative z-20 size-36">
            <AvatarImage src="/icon.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Card>

        {/* User Profile Card */}
        <Card className="flex min-h-96 items-center justify-center">
          <Avatar className="size-36">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.username}</AvatarFallback>
          </Avatar>
        </Card>
      </div>

      <Card className="mt-5 min-h-16 w-full py-2">
        {messages.length > 0 && (
          <div className="dark-gradient flex min-h-12 items-center justify-center rounded-2xl">
            <p
              key={lastMessage}
              className={cn(
                "text-center text-lg opacity-0 transition-opacity duration-500",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        )}
      </Card>

      <div className="mt-8 flex w-full justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <Button isLoading={isPending} className="btn-call relative" onClick={() => startInterview()}>
            Start Interview
          </Button>
        ) : (
          <Button isLoading={isEndInterviewPending} className="btn-disconnect" onClick={() => handleDisconnect()}>
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
};

export default InterviewAgent;
