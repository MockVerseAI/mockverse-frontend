import { IMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MessageProps {
  message: IMessage;
}

export default function Message({ message }: MessageProps) {
  return (
    <div className={cn("mb-4 flex", message.role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-xs rounded-lg px-4 py-2 md:max-w-md lg:max-w-lg xl:max-w-xl",
          message.role === "user" ? "bg-primary text-white" : "bg-muted"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
