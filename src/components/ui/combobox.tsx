import { Check, ChevronDown } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type ComboboxOption = {
  label: string;
  value: string;
};

type ComboboxSelectProps = {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
};

const Combobox = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search options...",
  emptyText = "No options found.",
  className = "w-full",
}: ComboboxSelectProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (label: string) => {
    const option = options.find((option) => option.label === label);
    if (option) {
      onChange(option.value);
      setOpen(false);
    }
  };

  const calculateButtonWidth = useCallback(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          calculateButtonWidth();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-label={placeholder}
          className={cn("justify-between", !value && "text-muted-foreground", className)}
        >
          {selectedOption?.label || placeholder}
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: buttonWidth > 0 ? `${buttonWidth}px` : undefined }}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem value={option.label} key={option.value} onSelect={handleSelect}>
                  {option.label}
                  <Check className={cn("ml-auto", option.value === value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
