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

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ApplicationEnhancerReport;
