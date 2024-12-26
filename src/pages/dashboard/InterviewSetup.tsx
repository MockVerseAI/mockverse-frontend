import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InterviewService, { IInterviewSetup } from "@/services/interviewService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  jobRole: z.string().min(3).max(50),
  jobDescription: z.string(),
});

const InterviewSetup = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobRole: "",
      jobDescription: "",
    },
  });
  const [resume, setResume] = useState<File>();

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
      console.log(data);
      navigate(`/dashboard/interview/chat/${data?.data?._id}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!resume) return toast.error("Please select a resume");

    const payload = { ...values, resume };
    setupInterview(payload);
  };

  const handleFileSelect = useCallback((files: File[]) => {
    setResume(files[0]);
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
                  <Label htmlFor="jobDescription">Job Descripton</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Enter the job details provided by the employer"
                    {...register("jobDescription")}
                    required
                  />
                </div>
                <FileUpload onChange={handleFileSelect} />
                <Button isLoading={isPending} type="submit" className="w-full">
                  Start Interview
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSetup;
