import Message from "@/components/Message";
import { IMessage } from "@/lib/types";
import { FC } from "react";

interface InterviewConversationProps {
  messages: IMessage[];
}

const InterviewConversation: FC<InterviewConversationProps> = ({ messages }) => {
  return (
    <div
      className="scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 mx-auto w-full max-w-5xl overflow-y-auto p-4"
      style={{ maxHeight: "calc(100vh - 200px)" }}
    >
      {messages.map((message: IMessage, index: number) => (
        <Message key={index} message={message} className="max-w-xs md:max-w-xs lg:max-w-md xl:max-w-md" />
      ))}
    </div>
  );
};

export default InterviewConversation;
