import { Resume } from "@/lib/types";
import { cn } from "@/lib/utils";
import ResumeService from "@/services/resumeService";
import { AppDispatch, RootState } from "@/store";
import { setResumes } from "@/store/user/slice";
import { useMutation } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { FileUpload } from "./ui/file-upload";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type ResumeSelectProps = {
  resumeSelectOpen: boolean;
  setResumeSelectOpen: (open: boolean) => void;
  selectedResume: Resume | null;
  setSelectedResume: (resume: Resume) => void;
};

const ResumeSelectDialog = ({
  resumeSelectOpen,
  setResumeSelectOpen,
  selectedResume,
  setSelectedResume,
}: ResumeSelectProps) => {
  const { resumes } = useSelector((root: RootState) => root.user);
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: uploadResume, isPending: isUploading } = useMutation({
    mutationFn: (file: File) => {
      return ResumeService.create({ resume: file });
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to upload resume");
    },
    onSuccess: async (r) => {
      if (r.data.data.alreadyExists == true) {
        toast.warning(r.data.message);
      } else {
        toast.success(r.data.message);
      }
      // Fetch updated resumes
      try {
        const response = await ResumeService.getAll();
        const resumes = response.data.data;
        dispatch(setResumes(resumes));
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch updated resumes");
      }
    },
  });

  const handleFileSelect = useCallback(
    (files: File[]) => {
      uploadResume(files[0]);
    },
    [uploadResume]
  );

  const handleResumeSelect = useCallback(
    (resumeId: string) => {
      const resume = resumes.find((r) => r._id === resumeId);
      if (resume) {
        setSelectedResume(resume);
        setResumeSelectOpen(false);
      }
    },
    [resumes, setResumeSelectOpen, setSelectedResume]
  );

  return (
    <Dialog open={resumeSelectOpen} onOpenChange={setResumeSelectOpen}>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Select Resume</DialogTitle>
          <DialogDescription>Please select an existing resume or upload a new resume</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={handleResumeSelect} value={selectedResume?._id}>
            <div className="relative w-full">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={resumes.length ? "Select a resume" : "Upload a resume"} />
              </SelectTrigger>
              {selectedResume ? (
                <a
                  href={selectedResume.url}
                  target="_black"
                  className={cn(buttonVariants({ variant: "default", size: "icon" }), "absolute right-10 top-1 size-7")}
                >
                  <ExternalLink className="size-4" />
                </a>
              ) : null}
            </div>

            <SelectContent>
              {resumes.map((item) => (
                <SelectItem key={item._id} value={item._id}>
                  {item.fileName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-center">OR</span>
          <FileUpload onChange={handleFileSelect} />
        </div>
        <DialogFooter className="flex-col sm:flex-row">
          {isUploading ? (
            <Button disabled={true} isLoading={isUploading}>
              Uploading
            </Button>
          ) : null}
          <Button onClick={() => setResumeSelectOpen(false)} className="mt-3 sm:mt-0">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeSelectDialog;
