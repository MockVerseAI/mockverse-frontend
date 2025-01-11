import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MessageProps {
  message: {
    text: string;
    isUser: boolean;
  };
}

export default function Message({ message }: MessageProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!message.isUser) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(message.text.slice(0, i));
        i++;
        if (i > message.text.length) {
          clearInterval(intervalId);
        }
      }, 20);
      return () => clearInterval(intervalId);
    } else {
      setDisplayedText(message.text);
    }
  }, [message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn("mb-4 flex", message.isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-xs rounded-lg px-4 py-2 md:max-w-md lg:max-w-lg xl:max-w-xl",
          message.isUser ? "bg-primary text-white" : "bg-muted"
        )}
      >
        {displayedText}
        {!message.isUser && displayedText.length < message.text.length && (
          <span className="animate-blink ml-1 inline-block h-4 w-1 bg-gray-800"></span>
        )}
      </div>
    </motion.div>
  );
}
