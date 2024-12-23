import Message from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Interview() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
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
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center h-full">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-y-auto w-full max-w-4xl p-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
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
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Start Interview"
              className="w-full py-6 rounded-lg bg-sidebar border-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Mic className="w-4 h-4" />
              </Button>

              <Button size="icon" onClick={handleSend}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
