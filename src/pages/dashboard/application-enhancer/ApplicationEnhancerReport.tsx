import ImpactMetrics from "@/components/application-report/ImpactMetrics";
import IndustryFit from "@/components/application-report/IndustryFit";
import Overview from "@/components/application-report/Overview";
import ProfessionalNarrative from "@/components/application-report/ProfessionalNarative";
import SkillsExperience from "@/components/application-report/SkillsExperience";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IApplication, IApplicationFeedback } from "@/lib/types";
import ApplicationService from "@/services/applicationService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

const ApplicationEnhancerReport = () => {
  const { id: applicationId = "" } = useParams();

  const { data, isPending } = useQuery({
    queryKey: [`application-report-${applicationId}`],
    queryFn: async () => {
      const res = await ApplicationService.report({ applicationId });
      return res?.data?.data;
    },
  });

  if (isPending) {
    return <div>Generating Report....</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  const { application, applicationFeedback } = data as {
    application: IApplication;
    applicationFeedback: IApplicationFeedback;
  };

  console.log({ application, applicationFeedback });

  return (
    <div>
      <h1>
        {application.companyName} - {application.jobRole}
      </h1>

      <div className="container mx-auto py-4">
        <Tabs defaultValue="overview">
          <div className="bg-muted relative h-[52px] overflow-x-scroll overflow-y-hidden rounded-sm lg:bg-transparent">
            <TabsList className="absolute flex w-full flex-row justify-stretch">
              <TabsTrigger className="w-full" value="overview">
                Overview
              </TabsTrigger>
              <TabsTrigger className="w-full" value="skills">
                Skills & Experience
              </TabsTrigger>
              <TabsTrigger className="w-full" value="impact">
                Impact & Metrics
              </TabsTrigger>
              <TabsTrigger className="w-full" value="narrative">
                Professional Narrative
              </TabsTrigger>
              <TabsTrigger className="w-full" value="alignment">
                Industry Alignment
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview">
            <Overview
              overview={applicationFeedback.core_alignment_analysis}
              actionPriorities={applicationFeedback.action_priorities}
            />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsExperience
              skillsExperience={applicationFeedback.skills_optimization}
              experienceEnhancement={applicationFeedback.experience_enhancement}
            />
          </TabsContent>
          <TabsContent value="impact">
            <ImpactMetrics impactMetrics={applicationFeedback.impact_metrics} />
          </TabsContent>
          <TabsContent value="narrative">
            <ProfessionalNarrative
              professionalNarrative={applicationFeedback.professional_narrative}
              competitiveAdvantages={applicationFeedback.competitive_advantages}
            />
          </TabsContent>
          <TabsContent value="alignment">
            <IndustryFit industryAlignment={applicationFeedback.industry_alignment} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationEnhancerReport;
