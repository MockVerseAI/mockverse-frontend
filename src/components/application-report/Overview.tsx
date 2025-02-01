import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/lib/types";
import React from "react";
import { Progress } from "../ui/progress";

interface OverviewProps {
  overview: IApplicationFeedback["core_alignment_analysis"];
  actionPriorities: IApplicationFeedback["action_priorities"];
}

const Overview: React.FC<OverviewProps> = ({ overview, actionPriorities }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Core Alignment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Role Fit Score</span>
              <span>{overview.role_fit_score}%</span>
            </div>
            <Progress value={70} className="w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Key Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            {overview.key_matches.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Critical Gaps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            {overview.critical_gaps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Action Priorities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold">Immediate Changes</h3>
              <ul className="list-disc pl-4">
                {actionPriorities.immediate_changes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">High Impact Updates</h3>
              <ul className="list-disc pl-4">
                {actionPriorities.high_impact_updates.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Strategic Enhancements</h3>
              <ul className="list-disc pl-4">
                {actionPriorities.strategic_enhancements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
