import NoReportFound from "@/components/cards/NoReportFound";
import BehavioralAnalysis from "@/components/interview-report/BehavioralAnalysis";
import DevelopmentPlan from "@/components/interview-report/DevelopmentPlan";
import InterviewConversation from "@/components/interview-report/InterviewConversation";
import Overview from "@/components/interview-report/Overview";
import TechnicalAssessment from "@/components/interview-report/TechnicalAssessment";
import ReportSkeleton from "@/components/loaders/ReportSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IInterviewReport, IMessage } from "@/types";
import InterviewService from "@/services/interviewService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const InterviewReport = () => {
  const { interviewId = "" } = useParams();

  const { data, isPending } = useQuery({
    queryKey: [`report-${interviewId}`],
    queryFn: async () => {
      const res = await InterviewService.report({ interviewId });
      return res?.data?.data;
    },
  });

  if (isPending) {
    return <ReportSkeleton />;
  }

  if (!data) {
    return <NoReportFound />;
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
            <TabsList className="absolute flex w-full flex-row justify-stretch *:w-full *:cursor-pointer">
              <TabsTrigger value="overview">Overview & Performance</TabsTrigger>
              <TabsTrigger value="technical">Technical Assessment</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral Analysis</TabsTrigger>
              <TabsTrigger value="development">Development Plan</TabsTrigger>
              <TabsTrigger value="conversation">Interview Conversation</TabsTrigger>
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
