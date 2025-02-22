import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IInterviewReport } from "@/lib/types";
import { FC } from "react";

interface DevelopmentPlanProps {
  immediate: IInterviewReport["developmentPlan"]["immediate"];
  shortTerm: IInterviewReport["developmentPlan"]["shortTerm"];
}

const DevelopmentPlan: FC<DevelopmentPlanProps> = ({ immediate, shortTerm }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Immediate Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Priorities</h3>
              <ul className="list-disc gap-2 pl-4">
                {immediate.priorities.map((priority, index) => (
                  <li key={index}>
                    <p className="font-medium">{priority.area}</p>
                    <p className="text-sm">
                      <span className="font-medium">Importance:</span> {priority.importance}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Action:</span> {priority.action}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Recommended Resources</h3>
              <ol className="list-disc gap-2 pl-4">
                {immediate.resources.map((resource, index) => (
                  <li key={index}>
                    <p className="font-medium">{resource.type}</p>
                    <p className="text-sm">{resource.description}</p>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">
                      Access Resource
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Short-Term Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Goals</h3>
              <ul className="list-disc gap-2 pl-4">
                {shortTerm.goals.map((goal, index) => (
                  <li key={index}>
                    <p className="font-medium">{goal.objective}</p>
                    <p className="text-sm">
                      <span className="font-medium">Timeline:</span> {goal.timeline}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Success Criteria:</span> {goal.success_criteria}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Skills Development</h3>
              <ul className="list-disc gap-2 pl-4">
                {shortTerm.skills.map((skill, index) => (
                  <li key={index}>
                    <p className="font-medium">{skill.skill}</p>
                    <p className="text-sm">
                      Current Level: {skill.current_level} → Target Level: {skill.target_level}
                    </p>
                    <p className="text-sm">Timeline: {skill.timeline}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentPlan;
