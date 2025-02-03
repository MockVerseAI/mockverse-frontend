import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IInterviewReport } from "@/lib/types";
import { FC } from "react";

interface OverviewProps {
  performanceMetrics: IInterviewReport["performanceMetrics"];
  roleAlignment: IInterviewReport["roleAlignment"];
  responseQuality: IInterviewReport["responseQuality"];
}

const Overview: FC<OverviewProps> = ({ performanceMetrics, roleAlignment, responseQuality }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex justify-between">
                <span>Overall Score</span>
                <span>{performanceMetrics.scores.overall}%</span>
              </div>
              <Progress value={performanceMetrics.scores.overall} />
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <span>Technical Score</span>
                <span>{performanceMetrics.scores.technical}%</span>
              </div>
              <Progress value={performanceMetrics.scores.technical} />
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <span>Behavioral Score</span>
                <span>{performanceMetrics.scores.behavioral}%</span>
              </div>
              <Progress value={performanceMetrics.scores.behavioral} />
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <span>Communication Score</span>
                <span>{performanceMetrics.scores.communication}%</span>
              </div>
              <Progress value={performanceMetrics.scores.communication} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Alignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Essential Requirements</h3>
              <ul className="list-disc pl-4">
                {roleAlignment.requirements.essential.map((req) => (
                  <li key={req.requirement} className={req.met ? "text-green-600" : "text-red-600"}>
                    {req.requirement} - {req.notes}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Cultural Fit</h3>
              <ul className="list-disc pl-4">
                {roleAlignment.cultural.fit.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Quality</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Structure</h3>
              <div className="mb-2 flex justify-between">
                <span>Clarity Score</span>
                <span>{responseQuality.structure.clarity}/10</span>
              </div>
              <Progress value={responseQuality.structure.clarity * 10} />
              <p className="mt-2 text-sm">{responseQuality.structure.organization}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">STAR Method Analysis</h3>
              <ul className="list-disc pl-4 text-sm">
                <li>Situation: {responseQuality.starMethod.situation}</li>
                <li>Task: {responseQuality.starMethod.task}</li>
                <li>Action: {responseQuality.starMethod.action}</li>
                <li>Result: {responseQuality.starMethod.result}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
