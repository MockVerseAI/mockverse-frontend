import { Button, buttonVariants } from "@/components/ui/button";
import Combobox, { ComboboxOption } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { Resume } from "@/lib/types";
import { cn } from "@/lib/utils";
import ResumeService from "@/services/resumeService";
import { AppDispatch, RootState } from "@/store";
import { getAllResumes } from "@/store/user/actions";
import { useMutation } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type ResumeSelectProps = {
  resumeSelectOpen: boolean;
  setResumeSelectOpen: (open: boolean) => void;
  selectedResume: Resume | null;
  setSelectedResume: (resume: Resume) => void;
};

const ResumeSelectModal = ({
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
        dispatch(getAllResumes());
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

  const resumeOptions: ComboboxOption[] = useMemo(
    () => resumes.map((resume) => ({ label: resume.fileName, value: resume._id })),
    [resumes]
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
          <div className="relative w-full">
            <Combobox
              options={resumeOptions}
              value={selectedResume?._id || ""}
              onChange={handleResumeSelect}
              placeholder={resumes.length ? "Select a resume" : "Upload a resume"}
              emptyText="No resumes found"
              searchPlaceholder="Search resumes..."
            />
            {selectedResume ? (
              <a
                href={selectedResume.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "icon" }),
                  "absolute top-1 right-9 z-10 size-7"
                )}
                aria-label="View resume"
              >
                <ExternalLink className="size-4" />
              </a>
            ) : null}
          </div>
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

export default ResumeSelectModal;
