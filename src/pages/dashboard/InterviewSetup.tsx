import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Resume } from "@/lib/types";
import InterviewService, { IInterviewSetup } from "@/services/interviewService";
import ResumeService from "@/services/resumeService";
import { AppDispatch, RootState } from "@/store";
import { setResumes } from "@/store/user/slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  jobRole: z.string().min(3).max(50),
  jobDescription: z.string(),
});

const InterviewSetup = () => {
  const { resumes } = useSelector((root: RootState) => root.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: "",
      jobDescription: "",
    },
  });

  const [uploadFile, setUploadFile] = useState<File>();
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [resumeSelectOpen, setResumeSelectOpen] = useState<boolean>(false);

  // Set initial resume when component mounts or resumes are updated
  useEffect(() => {
    if (resumes.length > 0 && !selectedResume) {
      setSelectedResume(resumes[0]);
    }
  }, [resumes, selectedResume]);

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

      setUploadFile(undefined);
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

  const { mutate: setupInterview, isPending } = useMutation({
    mutationFn: (payload: IInterviewSetup) => {
      return InterviewService.setup(payload);
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message);
    },
    onSuccess: (res: any) => {
      const { data } = res;
      navigate(`/dashboard/interview/chat/${data?.data?._id}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedResume) return toast.error("Please select a resume");

    const payload = { ...values, resumeId: selectedResume._id };
    setupInterview(payload);
  };

  const handleFileSelect = useCallback((files: File[]) => {
    setUploadFile(files[0]);
  }, []);

  const handleResumeSelectOpen = useCallback(() => {
    setResumeSelectOpen(true);
  }, []);

  const handleResumeSelect = useCallback(
    (resumeId: string) => {
      const resume = resumes.find((r) => r._id === resumeId);
      if (resume) {
        setSelectedResume(resume);
        setResumeSelectOpen(false);
      }
    },
    [resumes]
  );

  const handleResumePreview = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (selectedResume) {
        const newWindow = window.open(selectedResume?.url, "_blank");
        if (newWindow) newWindow.focus();
      }
    },
    [selectedResume]
  );

  return (
    <div className="flex w-full justify-center">
      <Card className="mt-10 w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Enter the details</CardTitle>
          <CardDescription>Let's get this started quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="jobRole">Job Role</Label>
                  <Input
                    id="jobRole"
                    type="text"
                    placeholder="Enter job role (ex. SDE1)"
                    {...register("jobRole")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Enter the job details provided by the employer"
                    {...register("jobDescription")}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resume">Resume</Label>
                  <div className="relative w-full">
                    <div
                      onClick={handleResumeSelectOpen}
                      className="flex h-9 w-full cursor-pointer items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      {selectedResume?.fileName || "Select a resume"}
                    </div>
                    {selectedResume ? (
                      <Button
                        onClick={handleResumePreview}
                        className="absolute right-9 top-1.5 z-20 h-auto px-1.5 py-1"
                      >
                        <ExternalLink className="size-3" />
                      </Button>
                    ) : null}
                    <ChevronDown className="absolute right-2 top-1/2 size-4 -translate-y-1/2 opacity-50" />
                  </div>
                </div>
                <Button isLoading={isPending} type="submit" className="w-full">
                  Start Interview
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
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
                  <Button onClick={handleResumePreview} className="absolute right-10 top-1.5 z-20 h-auto px-1.5 py-1">
                    <ExternalLink className="size-3" />
                  </Button>
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
            <Button
              disabled={!uploadFile}
              isLoading={isUploading}
              onClick={() => uploadFile && uploadResume(uploadFile)}
            >
              Upload
            </Button>
            <Button onClick={() => setResumeSelectOpen(false)} className="mt-3 sm:mt-0">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewSetup;
