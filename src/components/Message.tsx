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
      className={cn(
        "flex mb-4",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-2 rounded-lg",
          message.isUser ? "bg-primary" : "bg-muted"
        )}
      >
        {displayedText}
        {!message.isUser && displayedText.length < message.text.length && (
          <span className="inline-block w-1 h-4 ml-1 bg-gray-800 animate-blink"></span>
        )}
      </div>
    </motion.div>
  );
}
