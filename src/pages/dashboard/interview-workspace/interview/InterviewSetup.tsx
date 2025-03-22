import AiSuggestionCard from "@/components/cards/AiSuggestionCard";
import ResumeSelectModal from "@/components/modals/ResumeSelectModal";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Combobox, { ComboboxOption } from "@/components/ui/combobox";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { IInterviewTemplate, Resume } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewService, { IInterviewCreate } from "@/services/interviewService";
import InterviewTemplateService from "@/services/interviewTemplateService";
import { RootState } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const durations = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "60 minutes", value: "60" },
];

const difficulties = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
  { label: "Expert", value: "expert" },
];

const formSchema = z.object({
  duration: z.enum(["15", "30", "45", "60"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  interviewTemplateId: z.string(),
});

const InterviewSetup = () => {
  const { id: interviewWorkspaceId = "" } = useParams();
  const { resumes } = useSelector((root: RootState) => root.user);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: "15",
      difficulty: "beginner",
      interviewTemplateId: "",
    },
  });

  const formWatch = form.watch();

  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [resumeSelectOpen, setResumeSelectOpen] = useState<boolean>(false);

  useEffect(() => {
    if (resumes.length > 0 && !selectedResume) {
      setSelectedResume(resumes[0]);
    }
  }, [resumes, selectedResume]);

  const { mutate: createInterview, isPending } = useMutation({
    mutationFn: (payload: IInterviewCreate) => {
      return InterviewService.setup(interviewWorkspaceId, payload);
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message);
    },
    onSuccess: (res: any) => {
      const { data } = res;
      navigate(`/dashboard/interview-workspace/${interviewWorkspaceId}/interview/chat/${data?.data?._id}`);
    },
  });

  const { data: interviewTemplates } = useQuery({
    queryKey: ["interview-templates"],
    queryFn: async () => {
      const res = await InterviewTemplateService.get({
        params: {
          page: 1,
          limit: 1000,
        },
      });
      return res?.data?.data?.templates || [];
    },
  });

  const { data: relevantTemplate, isPending: isRelevantTemplatePending } = useQuery({
    queryKey: ["relevant-template", interviewWorkspaceId],
    queryFn: async () => {
      const res = await InterviewTemplateService.getRelevantTemplate(interviewWorkspaceId);
      return res?.data?.data;
    },
  });

  const interviewTemplateOptions = useMemo(() => {
    const relevantTemplateIds = relevantTemplate?.templates?.map((template: any) => template._id) || [];

    return (
      interviewTemplates
        ?.map((template: IInterviewTemplate) => ({
          label: template.name,
          value: template._id,
          aiIcon: relevantTemplateIds.includes(template._id),
        }))
        .sort((a: ComboboxOption, b: ComboboxOption) => {
          if (a.aiIcon && !b.aiIcon) return -1;
          if (!a.aiIcon && b.aiIcon) return 1;
          return 0;
        }) || []
    );
  }, [interviewTemplates, relevantTemplate]);

  const difficultyOptions = useMemo(() => {
    const relevantDifficulty = relevantTemplate?.recommendedDifficulty;

    let options = difficulties;

    if (relevantDifficulty) {
      options = difficulties
        .map((option: ComboboxOption) => {
          if (option.value === relevantDifficulty) {
            option.aiIcon = true;
          }
          return option;
        })
        .sort((a: ComboboxOption, b: ComboboxOption) => {
          if (a.aiIcon && !b.aiIcon) return -1;
          if (!a.aiIcon && b.aiIcon) return 1;
          return 0;
        });
    }

    return options;
  }, [relevantTemplate]);

  const onSubmit = useCallback(
    (values: z.infer<typeof formSchema>) => {
      if (!selectedResume) return toast.error("Please select a resume");

      const payload = {
        ...values,
        duration: parseInt(values.duration),
        resumeId: selectedResume._id,
        interviewTemplateId: values.interviewTemplateId,
      };
      createInterview(payload);
    },
    [createInterview, selectedResume]
  );

  const handleResumeSelectOpen = useCallback(() => {
    setResumeSelectOpen(true);
  }, []);

  return (
    <div className="flex w-full justify-center">
      <Card className="mt-10 w-full max-w-lg">
        <CardHeader className="relative text-left">
          <CardTitle className="text-xl">Enter the details</CardTitle>
          <CardDescription>Let's get this started quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                  control={form.control}
                  name="interviewTemplateId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Interview Template</FormLabel>
                      <Combobox
                        options={interviewTemplateOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select interview template"
                        searchPlaceholder="Search interview template..."
                        emptyText="No interview template found."
                      />
                      {!isRelevantTemplatePending ? (
                        relevantTemplate?.templates
                          .filter(
                            (template: IInterviewTemplate) => !formWatch.interviewTemplateId.includes(template._id)
                          )
                          .map((template: IInterviewTemplate) => (
                            <AiSuggestionCard
                              key={template._id}
                              label={template.name}
                              isGenerating={false}
                              onChange={() => {
                                form.setValue("interviewTemplateId", template._id);
                              }}
                            />
                          ))
                      ) : (
                        <AiSuggestionCard label="Generating" isGenerating={true} />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Duration</FormLabel>
                      <Combobox
                        options={durations}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select duration"
                        searchPlaceholder="Search duration..."
                        emptyText="No duration found."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Difficulty</FormLabel>
                      <Combobox
                        options={difficultyOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select difficulty"
                        searchPlaceholder="Search difficulty..."
                        emptyText="No difficulty found."
                      />
                      {!isRelevantTemplatePending ? (
                        relevantTemplate?.recommendedDifficulty &&
                        formWatch.difficulty !== relevantTemplate?.recommendedDifficulty && (
                          <AiSuggestionCard
                            label={`${relevantTemplate?.recommendedDifficulty}`}
                            isGenerating={false}
                            onChange={() => {
                              form.setValue("difficulty", relevantTemplate?.recommendedDifficulty);
                            }}
                          />
                        )
                      ) : (
                        <AiSuggestionCard label="Generating" isGenerating={true} />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <Label htmlFor="resume">Resume</Label>
                  <div className="relative w-full">
                    <div
                      onClick={handleResumeSelectOpen}
                      className="border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full cursor-pointer items-center rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    >
                      {selectedResume?.fileName || "Select a resume"}
                    </div>
                    {selectedResume ? (
                      <a
                        href={selectedResume.url}
                        target="_black"
                        className={cn(
                          buttonVariants({ variant: "default", size: "icon" }),
                          "absolute top-1 right-10 size-7"
                        )}
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    ) : null}
                    <ChevronDown className="absolute top-1/2 right-2 size-4 -translate-y-1/2 opacity-50" />
                  </div>
                </div>
                <Button isLoading={isPending} type="submit" className="w-full">
                  Start Interview
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
      <ResumeSelectModal
        resumeSelectOpen={resumeSelectOpen}
        selectedResume={selectedResume}
        setResumeSelectOpen={setResumeSelectOpen}
        setSelectedResume={setSelectedResume}
      />
    </div>
  );
};

export default InterviewSetup;
