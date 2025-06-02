import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/types";
import {
  AlertCircleIcon,
  ArrowRightIcon,
  AwardIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CodeIcon,
  LayersIcon,
  LightbulbIcon,
  PlusIcon,
  RefreshCwIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";

interface SkillsExperienceProps {
  skillsExperience: IApplicationFeedback["skills_optimization"];
  experienceEnhancement: IApplicationFeedback["experience_enhancement"];
}

const SkillsExperience: React.FC<SkillsExperienceProps> = ({ skillsExperience, experienceEnhancement }) => {
  // Calculate summary statistics
  const totalTechnicalActions =
    (skillsExperience?.technical_skills?.priority_additions?.length || 0) +
    (skillsExperience?.technical_skills?.skills_to_emphasize?.length || 0) +
    (skillsExperience?.technical_skills?.skills_to_reframe?.length || 0);

  const totalSoftSkillActions =
    (skillsExperience?.soft_skills?.missing_critical?.length || 0) +
    (skillsExperience?.soft_skills?.enhancement_suggestions?.length || 0);

  const totalExperienceActions =
    (experienceEnhancement?.achievements_optimization?.length || 0) +
    (experienceEnhancement?.missing_experiences?.length || 0);

  const SkillBadge = ({
    skill,
    variant = "default",
    icon,
  }: {
    skill: string;
    variant?: "default" | "secondary" | "outline";
    icon?: React.ReactNode;
  }) => (
    <Badge variant={variant} className="flex items-center gap-1 px-3 py-1">
      {icon}
      {skill}
    </Badge>
  );

  const ReframingCard = ({ skill }: { skill: { current: string; suggested: string; strategic_reason: string } }) => (
    <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 dark:border-amber-800 dark:from-amber-950/30 dark:to-yellow-950/30">
      <div className="mb-3 flex items-center gap-2">
        <RefreshCwIcon className="h-4 w-4 text-amber-600" />
        <span className="font-semibold text-amber-800 dark:text-amber-300">Skill Reframing</span>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current:</p>
            <p className="text-amber-800 dark:text-amber-300">{skill.current}</p>
          </div>
          <ArrowRightIcon className="h-4 w-4 text-amber-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Suggested:</p>
            <p className="text-amber-800 dark:text-amber-300">{skill.suggested}</p>
          </div>
        </div>
        <div className="rounded-md bg-amber-100 p-3 dark:bg-amber-900/40">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Strategic Reason:</p>
          <p className="text-sm text-amber-800 dark:text-amber-300">{skill.strategic_reason}</p>
        </div>
      </div>
    </div>
  );

  const EnhancementCard = ({ enhancement }: { enhancement: { skill: string; demonstration_suggestion: string } }) => (
    <div className="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 dark:border-purple-800 dark:from-purple-950/30 dark:to-indigo-950/30">
      <div className="mb-3 flex items-center gap-2">
        <TrendingUpIcon className="h-4 w-4 text-purple-600" />
        <span className="font-semibold text-purple-800 dark:text-purple-300">{enhancement.skill}</span>
      </div>
      <div className="rounded-md bg-purple-100 p-3 dark:bg-purple-900/40">
        <p className="text-sm font-medium text-purple-700 dark:text-purple-400">Enhancement Strategy:</p>
        <p className="text-sm text-purple-800 dark:text-purple-300">{enhancement.demonstration_suggestion}</p>
      </div>
    </div>
  );

  const AchievementCard = ({ achievement }: { achievement: any }) => (
    <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30">
      <div className="mb-4 flex items-center gap-2">
        <AwardIcon className="h-4 w-4 text-green-600" />
        <span className="font-semibold text-green-800 dark:text-green-300">Achievement Optimization</span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Version:</p>
          <div className="mt-1 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
            <p className="text-sm text-gray-800 dark:text-gray-300">{achievement.current_bullet}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-green-700 dark:text-green-400">Enhanced Version:</p>
          <div className="mt-1 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
            <p className="text-sm text-green-800 dark:text-green-300">{achievement.enhanced_version}</p>
          </div>
        </div>

        {achievement.improvements_made && achievement.improvements_made.length > 0 && (
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Key Improvements:</p>
            <ul className="mt-1 space-y-1">
              {achievement.improvements_made.map((improvement: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircleIcon className="mt-0.5 h-3 w-3 shrink-0 text-blue-600" />
                  <span className="text-blue-800 dark:text-blue-300">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 p-3 dark:from-blue-950/30 dark:to-indigo-950/30">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Role Alignment:</p>
          <p className="text-sm text-blue-800 dark:text-blue-300">{achievement.alignment_with_role}</p>
        </div>
      </div>
    </div>
  );

  const ExperienceGapCard = ({ gap }: { gap: any }) => (
    <div className="rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-4 dark:border-orange-800 dark:from-orange-950/30 dark:to-red-950/30">
      <div className="mb-4 flex items-center gap-2">
        <TargetIcon className="h-4 w-4 text-orange-600" />
        <span className="font-semibold text-orange-800 dark:text-orange-300">Experience Gap</span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-red-700 dark:text-red-400">Required Experience:</p>
          <div className="mt-1 rounded-md bg-red-100 p-3 dark:bg-red-900/40">
            <p className="text-sm text-red-800 dark:text-red-300">{gap.required_experience}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-green-700 dark:text-green-400">Relevant Existing Experience:</p>
          <div className="mt-1 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
            <p className="text-sm text-green-800 dark:text-green-300">{gap.relevant_existing_experience}</p>
          </div>
        </div>

        <div className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 p-3 dark:from-blue-950/30 dark:to-indigo-950/30">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-400">Reframing Strategy:</p>
          <p className="text-sm text-blue-800 dark:text-blue-300">{gap.reframing_suggestion}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Skills & Experience Overview Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LayersIcon className="h-5 w-5 text-blue-600" />
            Skills & Experience Optimization Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center dark:from-blue-950/30 dark:to-indigo-950/30">
              <CodeIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Technical Skills</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalTechnicalActions}</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Actions Needed</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 text-center dark:from-purple-950/30 dark:to-pink-950/30">
              <UserIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Soft Skills</h3>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{totalSoftSkillActions}</p>
              <p className="text-sm text-purple-600 dark:text-purple-500">Areas to Enhance</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center dark:from-green-950/30 dark:to-emerald-950/30">
              <BookOpenIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Experience</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{totalExperienceActions}</p>
              <p className="text-sm text-green-600 dark:text-green-500">Optimization Items</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Technical Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CodeIcon className="h-5 w-5 text-blue-600" />
              Technical Skills Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Priority Additions */}
              {skillsExperience?.technical_skills?.priority_additions &&
                skillsExperience.technical_skills.priority_additions.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <PlusIcon className="h-4 w-4 text-green-600" />
                      <h3 className="font-semibold text-green-800 dark:text-green-300">
                        Priority Additions ({skillsExperience.technical_skills.priority_additions.length})
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsExperience.technical_skills.priority_additions.map((skill) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          variant="default"
                          icon={<PlusIcon className="h-3 w-3" />}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* Skills to Emphasize */}
              {skillsExperience?.technical_skills?.skills_to_emphasize &&
                skillsExperience.technical_skills.skills_to_emphasize.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <StarIcon className="h-4 w-4 text-amber-600" />
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                        Skills to Emphasize ({skillsExperience.technical_skills.skills_to_emphasize.length})
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsExperience.technical_skills.skills_to_emphasize.map((skill) => (
                        <SkillBadge
                          key={skill}
                          skill={skill}
                          variant="secondary"
                          icon={<StarIcon className="h-3 w-3" />}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* Skills to Reframe */}
              {skillsExperience?.technical_skills?.skills_to_reframe &&
                skillsExperience.technical_skills.skills_to_reframe.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <RefreshCwIcon className="h-4 w-4 text-orange-600" />
                      <h3 className="font-semibold text-orange-800 dark:text-orange-300">
                        Skills to Reframe ({skillsExperience.technical_skills.skills_to_reframe.length})
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {skillsExperience.technical_skills.skills_to_reframe.map((skill, index) => (
                        <ReframingCard key={index} skill={skill} />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>

        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserIcon className="h-5 w-5 text-purple-600" />
              Soft Skills Enhancement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Missing Critical Skills */}
              {skillsExperience?.soft_skills?.missing_critical &&
                skillsExperience.soft_skills.missing_critical.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <AlertCircleIcon className="h-4 w-4 text-red-600" />
                      <h3 className="font-semibold text-red-800 dark:text-red-300">
                        Missing Critical Skills ({skillsExperience.soft_skills.missing_critical.length})
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {skillsExperience.soft_skills.missing_critical.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-3 rounded-md bg-red-50 p-3 dark:bg-red-950/30"
                        >
                          <AlertCircleIcon className="h-4 w-4 shrink-0 text-red-600" />
                          <span className="text-red-800 dark:text-red-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Enhancement Suggestions */}
              {skillsExperience?.soft_skills?.enhancement_suggestions &&
                skillsExperience.soft_skills.enhancement_suggestions.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <LightbulbIcon className="h-4 w-4 text-purple-600" />
                      <h3 className="font-semibold text-purple-800 dark:text-purple-300">
                        Enhancement Strategies ({skillsExperience.soft_skills.enhancement_suggestions.length})
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {skillsExperience.soft_skills.enhancement_suggestions.map((enhancement, index) => (
                        <EnhancementCard key={index} enhancement={enhancement} />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Experience Enhancement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpenIcon className="h-5 w-5 text-green-600" />
            Experience Enhancement & Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Achievements Optimization */}
            {experienceEnhancement?.achievements_optimization &&
              experienceEnhancement.achievements_optimization.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <AwardIcon className="h-4 w-4 text-green-600" />
                    <h3 className="font-semibold text-green-800 dark:text-green-300">
                      Achievement Optimization ({experienceEnhancement.achievements_optimization.length})
                    </h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                    {experienceEnhancement.achievements_optimization.map((achievement, index) => (
                      <AchievementCard key={index} achievement={achievement} />
                    ))}
                  </div>
                </div>
              )}

            {/* Missing Experiences */}
            {experienceEnhancement?.missing_experiences && experienceEnhancement.missing_experiences.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <TargetIcon className="h-4 w-4 text-orange-600" />
                  <h3 className="font-semibold text-orange-800 dark:text-orange-300">
                    Experience Gaps & Reframing ({experienceEnhancement.missing_experiences.length})
                  </h3>
                </div>
                <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                  {experienceEnhancement.missing_experiences.map((gap, index) => (
                    <ExperienceGapCard key={index} gap={gap} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ZapIcon className="h-5 w-5 text-amber-600" />
            Optimization Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <CodeIcon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Technical</h3>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                {totalTechnicalActions} optimization{totalTechnicalActions !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <UserIcon className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300">Soft Skills</h3>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                {totalSoftSkillActions} enhancement{totalSoftSkillActions !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <AwardIcon className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">Achievements</h3>
              <p className="text-xs text-green-700 dark:text-green-400">
                {experienceEnhancement?.achievements_optimization?.length || 0} optimization
                {(experienceEnhancement?.achievements_optimization?.length || 0) !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-950/30">
              <TargetIcon className="mx-auto mb-2 h-6 w-6 text-orange-600" />
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300">Experience</h3>
              <p className="text-xs text-orange-700 dark:text-orange-400">
                {experienceEnhancement?.missing_experiences?.length || 0} gap
                {(experienceEnhancement?.missing_experiences?.length || 0) !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsExperience;
