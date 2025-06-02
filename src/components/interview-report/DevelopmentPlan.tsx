import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { IInterviewReport } from "@/types";
import { FC } from "react";
import {
  ZapIcon,
  CalendarIcon,
  BookOpenIcon,
  TargetIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  ClockIcon,
  StarIcon,
  BrainIcon,
  ArrowRightIcon,
  FlagIcon,
  LinkIcon,
  AwardIcon,
} from "lucide-react";

interface DevelopmentPlanProps {
  immediate: IInterviewReport["developmentPlan"]["immediate"];
  shortTerm: IInterviewReport["developmentPlan"]["shortTerm"];
}

const DevelopmentPlan: FC<DevelopmentPlanProps> = ({ immediate, shortTerm }) => {
  const getImportanceLevel = (importance: string) => {
    const level = importance.toLowerCase();
    if (level.includes("high") || level.includes("critical")) return "high";
    if (level.includes("medium") || level.includes("moderate")) return "medium";
    return "low";
  };

  const getImportanceBadge = (importance: string) => {
    const level = getImportanceLevel(importance);
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline",
    } as const;

    return variants[level] || "secondary";
  };

  const getImportanceIcon = (importance: string) => {
    const level = getImportanceLevel(importance);
    switch (level) {
      case "high":
        return <ZapIcon className="h-4 w-4 text-red-500" />;
      case "medium":
        return <TrendingUpIcon className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      default:
        return <StarIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  const PriorityCard = ({
    area,
    importance,
    action,
    index,
  }: {
    area: string;
    importance: string;
    action: string;
    index: number;
  }) => (
    <div className="relative rounded-lg border bg-gradient-to-r from-orange-50 to-red-50 p-4 dark:from-orange-950/30 dark:to-red-950/30">
      <div className="absolute top-3 left-3">
        <Badge variant="secondary" className="h-6 w-6 rounded-full p-0 text-xs">
          {index + 1}
        </Badge>
      </div>
      <div className="space-y-3 pl-8">
        <div>
          <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">{area}</h4>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md bg-orange-50 p-3 dark:bg-orange-950/30">
            <div className="mb-1 flex items-center gap-1">
              {getImportanceIcon(importance)}
              <span className="text-sm font-medium text-orange-800 dark:text-orange-300">Priority Level</span>
            </div>
            <Badge variant={getImportanceBadge(importance)} className="text-xs">
              {importance}
            </Badge>
          </div>
          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/30">
            <div className="mb-1 flex items-center gap-1">
              <TargetIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Action Required</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-400">{action}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const ResourceCard = ({
    type,
    description,
    link,
    index,
  }: {
    type: string;
    description: string;
    link: string;
    index: number;
  }) => (
    <div className="rounded-lg border bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:from-green-950/30 dark:to-emerald-950/30">
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/50">
          <BookOpenIcon className="h-4 w-4 text-green-600" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {type}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700"
            >
              <LinkIcon className="h-3 w-3" />
              Access Resource
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const GoalCard = ({
    objective,
    timeline,
    success_criteria,
    index,
  }: {
    objective: string;
    timeline: string;
    success_criteria: string;
    index: number;
  }) => (
    <div className="rounded-lg border bg-gradient-to-r from-purple-50 to-indigo-50 p-4 dark:from-purple-950/30 dark:to-indigo-950/30">
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <div className="rounded-full bg-purple-100 p-1 dark:bg-purple-900/50">
            <FlagIcon className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{objective}</h4>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md bg-purple-50 p-3 dark:bg-purple-950/30">
            <div className="mb-1 flex items-center gap-1">
              <ClockIcon className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Timeline</span>
            </div>
            <p className="text-sm text-purple-700 dark:text-purple-400">{timeline}</p>
          </div>
          <div className="rounded-md bg-indigo-50 p-3 dark:bg-indigo-950/30">
            <div className="mb-1 flex items-center gap-1">
              <AwardIcon className="h-4 w-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Success Criteria</span>
            </div>
            <p className="text-sm text-indigo-700 dark:text-indigo-400">{success_criteria}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const getSkillProgress = (currentLevel: string, targetLevel: string) => {
    const levels = ["beginner", "basic", "intermediate", "advanced", "expert"];
    const currentIndex = levels.findIndex((level) => currentLevel.toLowerCase().includes(level));
    const targetIndex = levels.findIndex((level) => targetLevel.toLowerCase().includes(level));

    if (currentIndex === -1 || targetIndex === -1) return 50;
    return ((currentIndex + 1) / (targetIndex + 1)) * 100;
  };

  const SkillCard = ({
    skill,
    current_level,
    target_level,
    timeline,
    index,
  }: {
    skill: string;
    current_level: string;
    target_level: string;
    timeline: string;
    index: number;
  }) => {
    const progress = getSkillProgress(current_level, target_level);

    return (
      <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-cyan-50 p-4 dark:from-blue-950/30 dark:to-cyan-950/30">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-blue-100 p-1 dark:bg-blue-900/50">
              <BrainIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 dark:text-slate-100">{skill}</h4>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {current_level} → {target_level}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="rounded-md bg-cyan-50 p-3 dark:bg-cyan-950/30">
            <div className="mb-1 flex items-center gap-1">
              <CalendarIcon className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-medium text-cyan-800 dark:text-cyan-300">Timeline</span>
            </div>
            <p className="text-sm text-cyan-700 dark:text-cyan-400">{timeline}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Immediate Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ZapIcon className="h-5 w-5 text-orange-600" />
            Immediate Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Priorities */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <FlagIcon className="h-4 w-4" />
                Priority Areas ({immediate.priorities.length})
              </h3>
              <div className="space-y-4">
                {immediate.priorities.map((priority, index) => (
                  <PriorityCard
                    key={index}
                    area={priority.area}
                    importance={priority.importance}
                    action={priority.action}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Resources */}
            {immediate.resources && immediate.resources.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <BookOpenIcon className="h-4 w-4" />
                  Recommended Resources ({immediate.resources.length})
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {immediate.resources.map((resource, index) => (
                    <ResourceCard
                      key={index}
                      type={resource.type}
                      description={resource.description}
                      link={resource.link}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Short-Term Development Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarIcon className="h-5 w-5 text-purple-600" />
            Short-Term Development Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Goals */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <TargetIcon className="h-4 w-4" />
                Development Goals ({shortTerm.goals.length})
              </h3>
              <div className="space-y-4">
                {shortTerm.goals.map((goal, index) => (
                  <GoalCard
                    key={index}
                    objective={goal.objective}
                    timeline={goal.timeline}
                    success_criteria={goal.success_criteria}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Skills Development */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <BrainIcon className="h-4 w-4" />
                Skills Development Roadmap ({shortTerm.skills.length})
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {shortTerm.skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    skill={skill.skill}
                    current_level={skill.current_level}
                    target_level={skill.target_level}
                    timeline={skill.timeline}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Development Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUpIcon className="h-5 w-5 text-green-600" />
            Development Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-950/30">
              <ZapIcon className="mx-auto mb-2 h-8 w-8 text-orange-600" />
              <h3 className="font-semibold text-orange-800 dark:text-orange-300">Immediate Actions</h3>
              <p className="text-sm text-orange-700 dark:text-orange-400">
                {immediate.priorities.length} priority area{immediate.priorities.length !== 1 ? "s" : ""}
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-400">
                {immediate.resources?.length || 0} resource{(immediate.resources?.length || 0) !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <TargetIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Goals</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                {shortTerm.goals.length} development goal{shortTerm.goals.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <BrainIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Skills</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {shortTerm.skills.length} skill{shortTerm.skills.length !== 1 ? "s" : ""} to develop
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevelopmentPlan;
