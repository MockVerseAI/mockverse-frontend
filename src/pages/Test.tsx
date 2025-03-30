import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, vapi } from "@/lib/utils";
import { motion } from "framer-motion";

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

const Test = () => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [agentVolumeLevel, setAgentVolumeLevel] = useState<number>(0);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
    };

    const onSpeechEnd = () => {
      console.log("speech end");
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    const onVolumeLevelChange = (volumeLevel: number) => {
      console.log("volume level", volumeLevel);
      setAgentVolumeLevel(volumeLevel);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);
    vapi.on("volume-level", onVolumeLevelChange);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      vapi.off("volume-level", onVolumeLevelChange);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  const handleCall = async () => {
    vapi.start(import.meta.env.VITE_INTERVIEW_ID);
    setCallStatus(CallStatus.CONNECTING);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-4 lg:px-10">
      <div className="grid w-full grid-cols-2 gap-8">
        <Card className="relative flex min-h-96 items-center justify-center">
          <motion.div
            animate={{ scale: 1 + agentVolumeLevel, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-accent absolute top-1/2 left-1/2 z-10 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          />
          <Avatar className="relative z-20 size-36">
            <AvatarImage src="/icon.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Card>

        {/* User Profile Card */}
        <Card className="flex min-h-96 items-center justify-center">
          <Avatar className="size-36">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
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
        {callStatus !== "ACTIVE" ? (
          <Button className="btn-call relative" onClick={() => handleCall()}>
            <span
              className={cn("absolute animate-ping rounded-full opacity-75", callStatus !== "CONNECTING" && "hidden")}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : ". . ."}
            </span>
          </Button>
        ) : (
          <Button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </Button>
        )}
      </div>
    </div>
  );
};

export default Test;
