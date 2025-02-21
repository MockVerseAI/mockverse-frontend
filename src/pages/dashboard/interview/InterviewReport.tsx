import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IInterviewReport, IMessage } from "@/lib/types";
import InterviewService from "@/services/interviewService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Overview from "@/components/interview-report/Overview";
import TechnicalAssessment from "@/components/interview-report/TechnicalAssessment";
import BehavioralAnalysis from "@/components/interview-report/BehavioralAnalysis";
import DevelopmentPlan from "@/components/interview-report/DevelopmentPlan";
import InterviewConversation from "@/components/interview-report/InterviewConversation";

const InterviewReport = () => {
  const { id: interviewId = "" } = useParams();

  const { data, isPending } = useQuery({
    queryKey: [`report-${interviewId}`],
    queryFn: async () => {
      const res = await InterviewService.report({ interviewId });
      return res?.data?.data;
    },
  });

  if (isPending) {
    return <div>Generating Report....</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  const { interviewReport, messages, interview } = data as {
    interviewReport: IInterviewReport;
    messages: IMessage[];
    interview: any;
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{interview.jobRole} - Interview Report</h1>

      <div className="container mx-auto py-4">
        <Tabs defaultValue="overview">
          <div className="bg-muted relative h-[52px] overflow-x-scroll overflow-y-hidden rounded-sm lg:bg-transparent">
            <TabsList className="absolute flex w-full flex-row justify-stretch">
              <TabsTrigger className="w-full" value="overview">
                Overview & Performance
              </TabsTrigger>
              <TabsTrigger className="w-full" value="technical">
                Technical Assessment
              </TabsTrigger>
              <TabsTrigger className="w-full" value="behavioral">
                Behavioral Analysis
              </TabsTrigger>
              <TabsTrigger className="w-full" value="development">
                Development Plan
              </TabsTrigger>
              <TabsTrigger className="w-full" value="conversation">
                Interview Conversation
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview">
            <Overview
              performanceMetrics={interviewReport.performanceMetrics}
              roleAlignment={interviewReport.roleAlignment}
              responseQuality={interviewReport.responseQuality}
            />
          </TabsContent>

          <TabsContent value="technical">
            <TechnicalAssessment
              skillsAnalysis={interviewReport.technicalAssessment.skillsAnalysis}
              problemSolving={interviewReport.technicalAssessment.problemSolving}
              technicalCommunication={interviewReport.technicalAssessment.technicalCommunication}
            />
          </TabsContent>

          <TabsContent value="behavioral">
            <BehavioralAnalysis
              leadership={interviewReport.behavioralAnalysis.leadership}
              adaptability={interviewReport.behavioralAnalysis.adaptability}
              collaboration={interviewReport.behavioralAnalysis.collaboration}
            />
          </TabsContent>

          <TabsContent value="development">
            <DevelopmentPlan
              immediate={interviewReport.developmentPlan.immediate}
              shortTerm={interviewReport.developmentPlan.shortTerm}
            />
          </TabsContent>

          <TabsContent value="conversation">
            <InterviewConversation messages={messages} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InterviewReport;
