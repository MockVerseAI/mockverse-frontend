import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IApplicationFeedback } from "@/lib/types";
import React from "react";

interface SkillsExperienceProps {
  skillsExperience: IApplicationFeedback["skills_optimization"];
  experienceEnhancement: IApplicationFeedback["experience_enhancement"];
}

const SkillsExperience: React.FC<SkillsExperienceProps> = ({ skillsExperience, experienceEnhancement }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 font-semibold">Priority Additions:</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {skillsExperience?.technical_skills?.priority_additions.map((skill) => {
              return <Badge key={skill}>{skill}</Badge>;
            })}
          </div>
          <h3 className="mb-2 font-semibold">Skills to Emphasize:</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {skillsExperience?.technical_skills?.skills_to_emphasize.map((skill) => {
              return (
                <Badge variant="secondary" key={skill}>
                  {skill}
                </Badge>
              );
            })}
          </div>
          <h3 className="mb-2 font-semibold">Skills to Reframe:</h3>
          {skillsExperience?.technical_skills?.skills_to_reframe.map((skill) => {
            return (
              <div key={skill.current} className="mb-4">
                <h4 className="font-semibold">Current: {skill.current}</h4>
                <p>Suggested: {skill.suggested}</p>
                <p>Reason: {skill.strategic_reason}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Soft Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 font-semibold">Missing Critical:</h3>
          <ul className="mb-4 list-disc pl-4">
            {skillsExperience?.soft_skills?.missing_critical.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
          <h3 className="mb-2 font-semibold">Enhancement Suggestions:</h3>
          {skillsExperience?.soft_skills?.enhancement_suggestions.map((item) => {
            return (
              <div key={item.skill} className="mb-4">
                <h4 className="font-semibold">Skill: {item.skill}</h4>
                <p>Suggested: {item.demonstration_suggestion}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Experience Enhancement</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 font-semibold">Achievements Optimization:</h3>
          {experienceEnhancement?.achievements_optimization?.map((item) => {
            return (
              <div key={item.alignment_with_role} className="mb-4">
                <h4 className="font-semibold">Current: {item.current_bullet}</h4>
                <p>Enhanced Version: {item.enhanced_version}</p>
                <ul className="list-disc pl-4">{item?.improvements_made.map((item) => <li key={item}>{item}</li>)}</ul>
                <p>Alignment with role: {item.alignment_with_role}</p>
              </div>
            );
          })}

          <h3 className="mb-2 font-semibold">Missing Experiences:</h3>
          {experienceEnhancement?.missing_experiences?.map((item) => {
            return (
              <div key={item.required_experience} className="mb-4">
                <h4 className="font-semibold">Required: {item.required_experience}</h4>
                <p>Relevant existing experience: {item.relevant_existing_experience}</p>
                <p>Reframing suggestion: {item.reframing_suggestion}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsExperience;
