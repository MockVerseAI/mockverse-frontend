import ResumeSelectDialog from "@/components/ResumeSelectDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Resume } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewService, { IInterviewSetup } from "@/services/interviewService";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  jobRole: z.string().min(3).max(50),
  jobDescription: z.string(),
});

const InterviewSetup = () => {
  const { resumes } = useSelector((root: RootState) => root.user);
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: "",
      jobDescription: "",
    },
  });

  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [resumeSelectOpen, setResumeSelectOpen] = useState<boolean>(false);

  // Set initial resume when component mounts or resumes are updated
  useEffect(() => {
    if (resumes.length > 0 && !selectedResume) {
      setSelectedResume(resumes[0]);
    }
  }, [resumes, selectedResume]);

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

  const handleResumeSelectOpen = useCallback(() => {
    setResumeSelectOpen(true);
  }, []);

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
                      <a
                        href={selectedResume.url}
                        target="_black"
                        className={cn(
                          buttonVariants({ variant: "default", size: "icon" }),
                          "absolute right-10 top-1 size-7"
                        )}
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    ) : null}
                    <ChevronDown className="absolute right-2 top-1/2 size-4 -translate-y-1/2 opacity-50" />
                  </div>
                </div>
                <Button isLoading={isPending} type="submit" className="w-full">
                  Get Feedback
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <ResumeSelectDialog
        resumeSelectOpen={resumeSelectOpen}
        selectedResume={selectedResume}
        setResumeSelectOpen={setResumeSelectOpen}
        setSelectedResume={setSelectedResume}
      />
    </div>
  );
};

export default InterviewSetup;
