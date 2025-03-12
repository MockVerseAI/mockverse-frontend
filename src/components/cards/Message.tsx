import { IMessage } from "@/lib/types";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

interface MessageProps {
  message: IMessage;
  className?: string;
}

export default function Message({ message, className }: MessageProps) {
  return (
    <div className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs rounded-lg px-4 py-2 md:max-w-md lg:max-w-lg xl:max-w-xl",
          message.role === "user" ? "bg-primary text-white" : "bg-muted",
          className
        )}
      >
        <Markdown>{message.content}</Markdown>
      </div>
    </div>
  );
}
