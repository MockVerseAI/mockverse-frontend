import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  className,
  type,
  togglePassword = true,
  ...props
}: React.ComponentProps<"input"> & { togglePassword?: boolean }) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <div className="relative flex items-center">
      <input
        data-slot="input"
        type={togglePassword && isPasswordVisible ? "text" : type}
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
      {type === "password" && togglePassword && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="text-muted-foreground hover:text-foreground absolute right-3 focus:outline-hidden"
        >
          {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      )}
    </div>
  );
};
Input.displayName = "Input";

export { Input };
