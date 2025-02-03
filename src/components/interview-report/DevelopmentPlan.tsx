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
          <CardTitle>Immediate Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Priorities</h3>
              {immediate.priorities.map((priority, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{priority.area}</p>
                  <p className="text-sm">
                    <span className="font-medium">Importance:</span> {priority.importance}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Action:</span> {priority.action}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Recommended Resources</h3>
              {immediate.resources.map((resource, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{resource.type}</p>
                  <p className="text-sm">{resource.description}</p>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600">
                    Access Resource
                  </a>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Short-Term Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Goals</h3>
              {shortTerm.goals.map((goal, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{goal.objective}</p>
                  <p className="text-sm">
                    <span className="font-medium">Timeline:</span> {goal.timeline}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Success Criteria:</span> {goal.success_criteria}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Skills Development</h3>
              {shortTerm.skills.map((skill, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{skill.skill}</p>
                  <p className="text-sm">
                    Current Level: {skill.current_level} → Target Level: {skill.target_level}
                  </p>
                  <p className="text-sm">Timeline: {skill.timeline}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentPlan;
