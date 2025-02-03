import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IInterviewReport } from "@/lib/types";
import { FC } from "react";

interface BehavioralAnalysisProps {
  leadership: IInterviewReport["behavioralAnalysis"]["leadership"];
  adaptability: IInterviewReport["behavioralAnalysis"]["adaptability"];
  collaboration: IInterviewReport["behavioralAnalysis"]["collaboration"];
}

const BehavioralAnalysis: FC<BehavioralAnalysisProps> = ({ leadership, adaptability, collaboration }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Leadership</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Decision Making & Team Influence</h3>
              <ul className="list-disc pl-4">
                <li>{leadership.decisionMaking}</li>
                <li>{leadership.teamInfluence}</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Initiative Examples</h3>
              {leadership.initiative.map((item, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{item.example}</p>
                  <p className="text-sm">Impact: {item.impact}</p>
                  <p className="text-sm">Context: {item.context}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Adaptability</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            <li>Change Response: {adaptability.changeResponse}</li>
            <li>Learning: {adaptability.learning}</li>
            <li>Growth: {adaptability.growth}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Collaboration</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-4">
            <li>Teamwork: {collaboration.teamwork}</li>
            <li>Communication: {collaboration.communication}</li>
            <li>
              Cross-Team Collaboration:
              <ul className="mt-2 list-disc pl-4">
                {collaboration.crossTeam.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BehavioralAnalysis;
