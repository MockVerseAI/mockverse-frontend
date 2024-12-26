import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function InterviewChat() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState("");
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Ref for the chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      setIsFirstMessage(false);
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: `Hi ${input}! How's it going? 🙂`,
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  // Scroll to the bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col items-center">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-4xl flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500"
          style={{ maxHeight: "calc(100vh - 150px)" }}
          ref={chatContainerRef} // Attach the ref here
        >
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          y: isFirstMessage ? "-50vh" : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mb-5 w-full"
      >
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Start Interview"
              className="w-full rounded-lg border-none bg-sidebar py-6"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
              <Button variant="ghost" size="icon">
                <Mic className="h-4 w-4" />
              </Button>

              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
