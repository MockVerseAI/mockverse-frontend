import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IInterviewReport } from "@/types";
import { CheckCircleIcon, CheckIcon, XCircleIcon, XIcon } from "lucide-react";
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
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
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

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Role Alignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Met Requirements */}
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-800 dark:text-green-300">
                <CheckCircleIcon className="h-5 w-5" />
                Met Requirements
              </h3>
              <ul className="space-y-2">
                {roleAlignment.requirements.essential
                  .filter((req) => req.met)
                  .map((req) => (
                    <li key={req.requirement} className="flex items-start gap-2 text-green-700 dark:text-green-400">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0" />
                      <span>
                        <span className="font-medium">{req.requirement}</span>
                        {req.notes && <span className="text-green-600 dark:text-green-500"> - {req.notes}</span>}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Unmet Requirements */}
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-800 dark:text-red-300">
                <XCircleIcon className="h-5 w-5" />
                Unmet Requirements
              </h3>
              <ul className="space-y-2">
                {roleAlignment.requirements.essential
                  .filter((req) => !req.met)
                  .map((req) => (
                    <li key={req.requirement} className="flex items-start gap-2 text-red-700 dark:text-red-400">
                      <XIcon className="mt-1 h-4 w-4 shrink-0" />
                      <span>
                        <span className="font-medium">{req.requirement}</span>
                        {req.notes && <span className="text-red-600 dark:text-red-500"> - {req.notes}</span>}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg">Response Quality</CardTitle>
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
                <li>
                  <span className="font-medium">Situation:</span> {responseQuality.starMethod.situation}
                </li>
                <li>
                  <span className="font-medium">Task:</span> {responseQuality.starMethod.task}
                </li>
                <li>
                  <span className="font-medium">Action:</span> {responseQuality.starMethod.action}
                </li>
                <li>
                  <span className="font-medium">Result:</span> {responseQuality.starMethod.result}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
