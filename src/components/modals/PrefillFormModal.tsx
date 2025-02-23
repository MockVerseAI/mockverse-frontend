import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debouce";
import PositionsService from "@/services/postionsService";
import { useMutation } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormData {
  companyName: string;
  jobRole: string;
  jobDescription: string;
}

interface PreviousFormDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (data: FormData) => void;
}

const PrefillFormModal = ({ open, onOpenChange, onSelect }: PreviousFormDataModalProps) => {
  const [search, setSearch] = useState("");
  const [positions, setPositions] = useState<FormData[]>([]);
  const debouncedSearch = useDebounce(search);

  const { mutate: getPositions } = useMutation({
    mutationFn: async () => {
      const res = await PositionsService.get({ search });
      return res.data?.data;
    },
    onSuccess: (data) => {
      setPositions(data);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to fetch positions");
    },
  });

  useEffect(() => {
    getPositions();
  }, [getPositions, debouncedSearch]);

  const handleSelect = (data: FormData) => {
    onSelect(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Select from History</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder="Search by company or role..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="scrollbar mt-2 max-h-[400px] min-h-[400px] space-y-2 overflow-y-auto">
          {positions.length > 0 ? (
            positions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelect(item)}
                className="hover:bg-muted cursor-pointer rounded-lg border p-3"
              >
                <h3 className="font-medium">
                  {item.companyName} - {item.jobRole}
                </h3>
                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">{item.jobDescription}</p>
              </div>
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Search className="text-muted-foreground mb-4 h-12 w-12" />
              <h3 className="text-lg font-medium">No positions found</h3>
              <p className="text-muted-foreground mt-1 text-sm">Try adjusting your search or add a new position</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrefillFormModal;
