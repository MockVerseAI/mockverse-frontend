import PrefillFormModal from "@/components/modals/PrefillFormModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TooltipButton } from "@/components/ui/tooltip-button";
import { cn } from "@/lib/utils";
import InterviewWorkspaceService, { IInterviewWorkspaceCreate } from "@/services/interviewWorkspaceService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { History } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  jobRole: z.string().min(3).max(50),
  jobDescription: z.string().max(2500),
  companyName: z.string(),
});

const InterviewWorkspaceSetup = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, watch, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      jobRole: "",
      jobDescription: "",
    },
  });
  const watchJobDescription = watch("jobDescription");

  const [prefillFormOpen, setPrefillFormOpen] = useState<boolean>(false);

  const { mutate: setupInterview, isPending } = useMutation({
    mutationFn: (payload: IInterviewWorkspaceCreate) => {
      return InterviewWorkspaceService.create(payload);
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message);
    },
    onSuccess: (res: any) => {
      const { data } = res;
      navigate(`/dashboard/interview-workspace/${data?.data?._id}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.jobDescription.length > 2500) return toast.error("Job description cannot be more than 2500 characters");

    const payload = { ...values };
    setupInterview(payload);
  };

  const onPrefillSelect = (data: z.infer<typeof formSchema>) => {
    setValue("companyName", data.companyName);
    setValue("jobRole", data.jobRole);
    setValue("jobDescription", data.jobDescription);
  };

  return (
    <div className="flex w-full justify-center">
      <Card className="mt-10 w-full max-w-lg">
        <CardHeader className="relative text-left">
          <CardTitle className="text-xl">Enter the details</CardTitle>
          <CardDescription>Let's get this started quickly</CardDescription>
          <TooltipButton title="Select from history">
            <Button size="icon" className="absolute top-0 right-6" onClick={() => setPrefillFormOpen(true)}>
              <History className="size-4" />
            </Button>
          </TooltipButton>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter company name (ex. Google)"
                  {...register("companyName")}
                  required
                />
              </div>
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
                  className="h-[200px]"
                  required
                />
                <div className="-mt-1 flex justify-end">
                  <span
                    className={cn(
                      "text-xs",
                      watchJobDescription.length > 2500 ? "text-red-400" : "text-muted-foreground"
                    )}
                  >
                    {watchJobDescription.length}/2500
                  </span>
                </div>
              </div>
              <Button isLoading={isPending} type="submit" className="w-full">
                Create Workspace
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <PrefillFormModal open={prefillFormOpen} onOpenChange={setPrefillFormOpen} onSelect={onPrefillSelect} />
    </div>
  );
};

export default InterviewWorkspaceSetup;
