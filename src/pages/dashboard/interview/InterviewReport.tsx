import Message from "@/components/Message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InterviewService from "@/services/interviewService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

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

  const { interviewReport, messages } = data;

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Areas of Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 text-sm">
              {interviewReport.areasOfImprovement.map((item: string) => (
                <li>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-4 text-sm">
              {interviewReport.strengths.map((item: string) => (
                <li>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Feel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{interviewReport.overallFeel}</p>
          </CardContent>
        </Card>
      </div>
      <div
        className="w-full flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500"
        style={{ maxHeight: "calc(100vh - 80px)" }}
      >
        {messages.map((message: any, index: any) => (
          <Message key={index} message={message} className="max-w-xs md:max-w-xs lg:max-w-md xl:max-w-md" />
        ))}
      </div>
    </div>
  );
};

export default InterviewReport;
