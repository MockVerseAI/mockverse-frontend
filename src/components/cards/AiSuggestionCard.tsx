import AiIcon from "@/assets/ai-icon";
import { cn } from "@/lib/utils";
import { Loader2, Plus } from "lucide-react";

interface AiSuggestionCardProps {
  label: string;
  isGenerating: boolean;
  onChange?: () => void;
}

const AiSuggestionCard = ({ label, isGenerating, onChange = () => {} }: AiSuggestionCardProps) => {
  return (
    <div
      className={cn(
        "border-accent flex w-fit cursor-pointer items-center gap-2 rounded-md border-1 border-dashed px-2 py-1 shadow-sm",
        isGenerating ? "opacity-80" : "cursor-pointer"
      )}
      onClick={onChange}
    >
      <AiIcon className="size-3" />
      <span className="text-muted-foreground text-sm font-medium capitalize">{label}</span>
      {isGenerating ? <Loader2 className="text-primary size-3 animate-spin" /> : <Plus className="size-3" />}
    </div>
  );
};

export default AiSuggestionCard;
