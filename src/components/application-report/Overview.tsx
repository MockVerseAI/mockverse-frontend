import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IApplicationFeedback } from "@/types";
import {
  AlertTriangleIcon,
  AwardIcon,
  BrainIcon,
  CheckCircleIcon,
  FileTextIcon,
  LightbulbIcon,
  RocketIcon,
  SearchIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";

interface OverviewProps {
  overview: IApplicationFeedback["core_alignment_analysis"];
  actionPriorities: IApplicationFeedback["action_priorities"];
}

const Overview: React.FC<OverviewProps> = ({ overview, actionPriorities }) => {
  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "secondary";
    return "destructive";
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
    if (score >= 60) return <StarIcon className="h-4 w-4 text-yellow-600" />;
    return <AlertTriangleIcon className="h-4 w-4 text-red-600" />;
  };

  const MatchItem = ({ match, type = "positive" }: { match: string; type?: "positive" | "negative" }) => (
    <div
      className={`flex items-start gap-3 rounded-md p-3 ${
        type === "positive" ? "bg-green-50 dark:bg-green-950/30" : "bg-red-50 dark:bg-red-950/30"
      }`}
    >
      {type === "positive" ? (
        <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
      ) : (
        <AlertTriangleIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
      )}
      <p
        className={`text-sm leading-relaxed ${
          type === "positive" ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
        }`}
      >
        {match}
      </p>
    </div>
  );

  const ActionItem = ({
    action,
    icon,
    priority = "medium",
  }: {
    action: string;
    icon: React.ReactNode;
    priority?: "high" | "medium" | "low";
  }) => {
    const priorityColors = {
      high: "border-l-red-500 bg-red-50 dark:bg-red-950/30",
      medium: "border-l-orange-500 bg-orange-50 dark:bg-orange-950/30",
      low: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/30",
    };

    const textColors = {
      high: "text-red-800 dark:text-red-300",
      medium: "text-orange-800 dark:text-orange-300",
      low: "text-blue-800 dark:text-blue-300",
    };

    return (
      <div className={`rounded-lg border-l-4 p-4 ${priorityColors[priority]}`}>
        <div className="flex items-start gap-3">
          {icon}
          <div className="flex-1">
            <p className={`text-sm leading-relaxed ${textColors[priority]}`}>{action}</p>
          </div>
        </div>
      </div>
    );
  };

  const performanceCategory =
    overview.role_fit_score >= 80
      ? "Excellent Match"
      : overview.role_fit_score >= 60
        ? "Good Fit"
        : "Needs Improvement";

  return (
    <div className="space-y-6">
      {/* Application Overview Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AwardIcon className="h-5 w-5 text-amber-600" />
            Application Assessment Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-center dark:from-amber-950/30 dark:to-orange-950/30">
              <TargetIcon className="mx-auto mb-2 h-8 w-8 text-amber-600" />
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Role Fit</h3>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{overview.role_fit_score}%</p>
              <p className="text-sm text-amber-600 dark:text-amber-500">{performanceCategory}</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center dark:from-green-950/30 dark:to-emerald-950/30">
              <CheckCircleIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Strengths</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{overview.key_matches.length}</p>
              <p className="text-sm text-green-600 dark:text-green-500">Key Matches</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-red-50 to-pink-50 p-4 text-center dark:from-red-950/30 dark:to-pink-950/30">
              <AlertTriangleIcon className="mx-auto mb-2 h-8 w-8 text-red-600" />
              <h3 className="font-semibold text-red-800 dark:text-red-300">Gaps</h3>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">{overview.critical_gaps.length}</p>
              <p className="text-sm text-red-600 dark:text-red-500">Critical Areas</p>
            </div>
          </div>

          {/* Role Fit Analysis */}
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/30 dark:to-indigo-950/30">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TargetIcon className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">Overall Role Alignment</span>
              </div>
              <Badge variant={getScoreBadgeVariant(overview.role_fit_score)}>{overview.role_fit_score}%</Badge>
            </div>
            <Progress value={overview.role_fit_score} className="h-3" />
            <div className="mt-3 flex items-center gap-4 text-sm">
              {getScoreIcon(overview.role_fit_score)}
              <span className={`font-medium ${getScoreColor(overview.role_fit_score)}`}>{performanceCategory}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Key Matches */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CheckCircleIcon className="h-5 w-5 text-green-600" />
              Key Strengths & Matches ({overview.key_matches.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overview.key_matches.length > 0 ? (
              <div className="space-y-3">
                {overview.key_matches.map((match, index) => (
                  <MatchItem key={index} match={match} type="positive" />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-950/30">
                <SearchIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                <p className="text-muted-foreground">No key matches identified</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Critical Gaps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangleIcon className="h-5 w-5 text-red-600" />
              Critical Gaps & Areas for Improvement ({overview.critical_gaps.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overview.critical_gaps.length > 0 ? (
              <div className="space-y-3">
                {overview.critical_gaps.map((gap, index) => (
                  <MatchItem key={index} match={gap} type="negative" />
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
                <CheckCircleIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <p className="text-green-700 dark:text-green-400">No critical gaps identified</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Priorities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <RocketIcon className="h-5 w-5 text-purple-600" />
            Action Priorities & Improvement Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Immediate Changes */}
            {actionPriorities.immediate_changes.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <ZapIcon className="h-4 w-4 text-red-600" />
                  Immediate Changes ({actionPriorities.immediate_changes.length})
                </h3>
                <div className="space-y-3">
                  {actionPriorities.immediate_changes.map((action, index) => (
                    <ActionItem
                      key={index}
                      action={action}
                      icon={<ZapIcon className="h-4 w-4 text-red-600" />}
                      priority="high"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* High Impact Updates */}
            {actionPriorities.high_impact_updates.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <TrendingUpIcon className="h-4 w-4 text-orange-600" />
                  High Impact Updates ({actionPriorities.high_impact_updates.length})
                </h3>
                <div className="space-y-3">
                  {actionPriorities.high_impact_updates.map((action, index) => (
                    <ActionItem
                      key={index}
                      action={action}
                      icon={<TrendingUpIcon className="h-4 w-4 text-orange-600" />}
                      priority="medium"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Strategic Enhancements */}
            {actionPriorities.strategic_enhancements.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <BrainIcon className="h-4 w-4 text-blue-600" />
                  Strategic Enhancements ({actionPriorities.strategic_enhancements.length})
                </h3>
                <div className="space-y-3">
                  {actionPriorities.strategic_enhancements.map((action, index) => (
                    <ActionItem
                      key={index}
                      action={action}
                      icon={<BrainIcon className="h-4 w-4 text-blue-600" />}
                      priority="low"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <LightbulbIcon className="h-5 w-5 text-amber-600" />
            Application Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-950/30">
              <TargetIcon className="mx-auto mb-2 h-6 w-6 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Alignment</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400">{overview.role_fit_score}% fit score</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <CheckCircleIcon className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">Strengths</h3>
              <p className="text-xs text-green-700 dark:text-green-400">
                {overview.key_matches.length} key match{overview.key_matches.length !== 1 ? "es" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-950/30">
              <AlertTriangleIcon className="mx-auto mb-2 h-6 w-6 text-red-600" />
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">Improvement</h3>
              <p className="text-xs text-red-700 dark:text-red-400">
                {overview.critical_gaps.length} critical gap{overview.critical_gaps.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <RocketIcon className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300">Actions</h3>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                {actionPriorities.immediate_changes.length +
                  actionPriorities.high_impact_updates.length +
                  actionPriorities.strategic_enhancements.length}{" "}
                total actions
              </p>
            </div>
          </div>

          {/* Overall Assessment */}
          <div className="mt-6 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 p-4 dark:from-slate-900/50 dark:to-slate-800/50">
            <div className="mb-2 flex items-center gap-2">
              <FileTextIcon className="h-4 w-4 text-slate-600" />
              <span className="font-semibold">Overall Assessment</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {overview.role_fit_score >= 80
                ? "Strong application with excellent role alignment. Focus on maintaining strengths while addressing minor gaps."
                : overview.role_fit_score >= 60
                  ? "Good application foundation with room for improvement. Prioritize high-impact updates to strengthen positioning."
                  : "Application needs significant enhancement. Focus on immediate changes and critical gap closure for better role fit."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
