import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IInterviewReport } from "@/types";
import {
  ArrowRightIcon,
  AwardIcon,
  BrainIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardListIcon,
  CodeIcon,
  FileTextIcon,
  LayersIcon,
  LightbulbIcon,
  MessageSquareIcon,
  SearchIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import { FC } from "react";

interface OverviewProps {
  performanceMetrics: IInterviewReport["performanceMetrics"];
  roleAlignment: IInterviewReport["roleAlignment"];
  responseQuality: IInterviewReport["responseQuality"];
}

const Overview: FC<OverviewProps> = ({ performanceMetrics, roleAlignment, responseQuality }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const ScoreCard = ({
    title,
    score,
    icon,
    description,
  }: {
    title: string;
    score: number;
    icon: React.ReactNode;
    description?: string;
  }) => (
    <div className="rounded-lg border bg-gradient-to-r from-slate-50 to-slate-100 p-4 dark:from-slate-900/50 dark:to-slate-800/50">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-semibold">{title}</span>
          </div>
          <Badge variant={getScoreBadgeVariant(score)}>{score}%</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Performance</span>
            <span className={`font-medium ${getScoreColor(score)}`}>
              {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Improvement"}
            </span>
          </div>
          <Progress value={score} className="h-3" />
        </div>

        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
    </div>
  );

  const RequirementItem = ({ requirement, notes, met }: { requirement: string; notes?: string; met: boolean }) => (
    <div
      className={`flex items-start gap-3 rounded-md p-3 ${met ? "bg-green-50 dark:bg-green-950/30" : "bg-red-50 dark:bg-red-950/30"}`}
    >
      {met ? (
        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
      ) : (
        <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
      )}
      <div className="flex-1">
        <span
          className={`font-medium ${met ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}
        >
          {requirement}
        </span>
        {notes && (
          <p
            className={`mt-1 text-sm ${met ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}
          >
            {notes}
          </p>
        )}
      </div>
    </div>
  );

  const StarMethodCard = ({
    aspect,
    content,
    icon,
    color = "blue",
  }: {
    aspect: string;
    content: string;
    icon: React.ReactNode;
    color?: "blue" | "green" | "purple" | "orange";
  }) => {
    const colorClasses = {
      blue: "bg-blue-50 border-l-blue-500 dark:bg-blue-950/30",
      green: "bg-green-50 border-l-green-500 dark:bg-green-950/30",
      purple: "bg-purple-50 border-l-purple-500 dark:bg-purple-950/30",
      orange: "bg-orange-50 border-l-orange-500 dark:bg-orange-950/30",
    };

    return (
      <div className={`rounded-lg border-l-4 p-4 ${colorClasses[color]}`}>
        <div className="mb-2 flex items-center gap-2">
          {icon}
          <span className="font-semibold">{aspect}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
      </div>
    );
  };

  // Calculate overall metrics
  const averageScore = Math.round(
    (performanceMetrics.scores.overall +
      performanceMetrics.scores.technical +
      performanceMetrics.scores.behavioral +
      performanceMetrics.scores.communication) /
      4
  );

  const metRequirements = roleAlignment.requirements.essential.filter((req) => req.met);
  const unmetRequirements = roleAlignment.requirements.essential.filter((req) => !req.met);
  const alignmentPercentage = roleAlignment.requirements.essential.length
    ? Math.round((metRequirements.length / roleAlignment.requirements.essential.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AwardIcon className="h-5 w-5 text-amber-600" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-center dark:from-amber-950/30 dark:to-orange-950/30">
              <AwardIcon className="mx-auto mb-2 h-8 w-8 text-amber-600" />
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Overall</h3>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                {performanceMetrics.scores.overall}%
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-500">Performance Score</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center dark:from-blue-950/30 dark:to-indigo-950/30">
              <CodeIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Technical</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {performanceMetrics.scores.technical}%
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Skills Assessment</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center dark:from-green-950/30 dark:to-emerald-950/30">
              <UsersIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Behavioral</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {performanceMetrics.scores.behavioral}%
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">Soft Skills</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-4 text-center dark:from-purple-950/30 dark:to-indigo-950/30">
              <MessageSquareIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Communication</h3>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {performanceMetrics.scores.communication}%
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-500">Expression</p>
            </div>
          </div>

          {/* Detailed Performance Metrics */}
          <div className="grid gap-4 md:grid-cols-2">
            <ScoreCard
              title="Overall Performance"
              score={performanceMetrics.scores.overall}
              icon={<AwardIcon className="h-4 w-4 text-amber-600" />}
              description={`Average score: ${averageScore}%`}
            />
            <ScoreCard
              title="Technical Skills"
              score={performanceMetrics.scores.technical}
              icon={<CodeIcon className="h-4 w-4 text-blue-600" />}
              description="Programming & problem-solving abilities"
            />
            <ScoreCard
              title="Behavioral Assessment"
              score={performanceMetrics.scores.behavioral}
              icon={<UsersIcon className="h-4 w-4 text-green-600" />}
              description="Leadership, teamwork & adaptability"
            />
            <ScoreCard
              title="Communication Skills"
              score={performanceMetrics.scores.communication}
              icon={<MessageSquareIcon className="h-4 w-4 text-purple-600" />}
              description="Clarity, articulation & technical explanation"
            />
          </div>
        </CardContent>
      </Card>

      {/* Role Alignment Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TargetIcon className="h-5 w-5 text-blue-600" />
            Role Alignment Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Alignment Overview */}
          <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/30 dark:to-indigo-950/30">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-semibold">Overall Role Fit</span>
              <Badge variant={getScoreBadgeVariant(alignmentPercentage)}>{alignmentPercentage}%</Badge>
            </div>
            <Progress value={alignmentPercentage} className="h-3" />
            <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
                <span>{metRequirements.length} requirements met</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircleIcon className="h-4 w-4 text-red-600" />
                <span>{unmetRequirements.length} areas for improvement</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Met Requirements */}
            {metRequirements.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <CheckCircleIcon className="h-4 w-4 text-green-600" />
                  Satisfied Requirements ({metRequirements.length})
                </h3>
                <div className="space-y-2">
                  {metRequirements.map((req, index) => (
                    <RequirementItem key={index} requirement={req.requirement} notes={req.notes} met={true} />
                  ))}
                </div>
              </div>
            )}

            {/* Unmet Requirements */}
            {unmetRequirements.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <XCircleIcon className="h-4 w-4 text-red-600" />
                  Development Areas ({unmetRequirements.length})
                </h3>
                <div className="space-y-2">
                  {unmetRequirements.map((req, index) => (
                    <RequirementItem key={index} requirement={req.requirement} notes={req.notes} met={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Additional Role Context */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                <div className="mb-2 flex items-center gap-2">
                  <BrainIcon className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-blue-800 dark:text-blue-300">Experience Level</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400">{roleAlignment.requirements.experience}</p>
              </div>

              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950/30">
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-purple-600" />
                  <span className="font-semibold text-purple-800 dark:text-purple-300">Growth Potential</span>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-400">{roleAlignment.potential.growth}</p>
              </div>

              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
                <div className="mb-2 flex items-center gap-2">
                  <StarIcon className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-300">Cultural Fit</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400">{roleAlignment.cultural.values}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Response Quality Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileTextIcon className="h-5 w-5 text-indigo-600" />
            Response Quality Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Structure Analysis */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <LayersIcon className="h-4 w-4" />
                Response Structure
              </h3>

              <div className="mb-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4 dark:from-indigo-950/30 dark:to-purple-950/30">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">Clarity Score</span>
                  <Badge variant={getScoreBadgeVariant(responseQuality.structure.clarity * 10)}>
                    {responseQuality.structure.clarity}/10
                  </Badge>
                </div>
                <Progress value={responseQuality.structure.clarity * 10} className="h-3" />
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {responseQuality.structure.organization}
                </p>
              </div>
            </div>

            {/* STAR Method Analysis */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <StarIcon className="h-4 w-4" />
                STAR Method Analysis
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <StarMethodCard
                  aspect="Situation"
                  content={responseQuality.starMethod.situation}
                  icon={<SearchIcon className="h-4 w-4 text-blue-500" />}
                  color="blue"
                />
                <StarMethodCard
                  aspect="Task"
                  content={responseQuality.starMethod.task}
                  icon={<ClipboardListIcon className="h-4 w-4 text-green-500" />}
                  color="green"
                />
                <StarMethodCard
                  aspect="Action"
                  content={responseQuality.starMethod.action}
                  icon={<ArrowRightIcon className="h-4 w-4 text-purple-500" />}
                  color="purple"
                />
                <StarMethodCard
                  aspect="Result"
                  content={responseQuality.starMethod.result}
                  icon={<AwardIcon className="h-4 w-4 text-orange-500" />}
                  color="orange"
                />
              </div>

              {/* STAR Method Tips */}
              {responseQuality.starMethod.tips && responseQuality.starMethod.tips.length > 0 && (
                <div className="mt-4 rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
                  <div className="mb-2 flex items-center gap-2">
                    <LightbulbIcon className="h-4 w-4 text-amber-600" />
                    <span className="font-semibold text-amber-800 dark:text-amber-300">Improvement Tips</span>
                  </div>
                  <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-400">
                    {responseQuality.starMethod.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 rounded-full bg-amber-600"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUpIcon className="h-5 w-5 text-green-600" />
            Interview Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-950/30">
              <AwardIcon className="mx-auto mb-2 h-6 w-6 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Performance</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400">{averageScore}% average</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <TargetIcon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Role Fit</h3>
              <p className="text-xs text-blue-700 dark:text-blue-400">{alignmentPercentage}% aligned</p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4 text-center dark:bg-indigo-950/30">
              <FileTextIcon className="mx-auto mb-2 h-6 w-6 text-indigo-600" />
              <h3 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Responses</h3>
              <p className="text-xs text-indigo-700 dark:text-indigo-400">
                {responseQuality.structure.clarity}/10 clarity
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <CheckCircleIcon className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">Overall</h3>
              <p className="text-xs text-green-700 dark:text-green-400">
                {performanceMetrics.scores.overall >= 70 ? "Strong candidate" : "Needs development"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
