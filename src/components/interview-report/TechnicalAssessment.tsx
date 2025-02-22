import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IInterviewReport } from "@/lib/types";
import { FC } from "react";

interface TechnicalAssessmentProps {
  skillsAnalysis: IInterviewReport["technicalAssessment"]["skillsAnalysis"];
  problemSolving: IInterviewReport["technicalAssessment"]["problemSolving"];
  technicalCommunication: IInterviewReport["technicalAssessment"]["technicalCommunication"];
}

const TechnicalAssessment: FC<TechnicalAssessmentProps> = ({
  skillsAnalysis,
  problemSolving,
  technicalCommunication,
}) => {
  const isSkillInBothLists = (skill: string) => {
    return (
      skillsAnalysis.demonstrated.some((d) => d.skill === skill) &&
      skillsAnalysis.required.some((r) => r.skill === skill)
    );
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Demonstrated Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillsAnalysis.demonstrated.map((skill) => (
                  <Badge key={skill.skill} variant="secondary">
                    {skill.skill} - {skill.level}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillsAnalysis.required.map((skill) => (
                  <Badge key={skill.skill} variant={isSkillInBothLists(skill.skill) ? "success" : "destructive"}>
                    {skill.skill} - {skill.level}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Skill Gaps</h3>
              <ul className="list-disc pl-4">
                {skillsAnalysis.gaps.map((gap) => (
                  <li key={gap.skill}>
                    <span className="font-medium">{gap.skill}</span>: {gap.recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Communication & Problem Solving</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Problem Solving Assessment</h3>
              <ul className="list-disc pl-4">
                <li>
                  <span className="font-medium">Analytical:</span> {problemSolving.analytical}
                </li>
                <li>
                  <span className="font-medium">Design:</span> {problemSolving.design}
                </li>
                <li>
                  <span className="font-medium">Scalability:</span> {problemSolving.scalability}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Technical Communication</h3>
              <ul className="list-disc pl-4">
                <li>
                  <span className="font-medium">Clarity:</span> {technicalCommunication.clarity}
                </li>
                <li>
                  <span className="font-medium">Depth:</span> {technicalCommunication.depth}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalAssessment;
