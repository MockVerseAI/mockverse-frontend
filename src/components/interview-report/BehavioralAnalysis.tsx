import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IInterviewReport } from "@/types";
import { FC } from "react";
import {
  CrownIcon,
  TrendingUpIcon,
  UsersIcon,
  LightbulbIcon,
  TargetIcon,
  CheckCircleIcon,
  StarIcon,
  BrainIcon,
  MessageSquareIcon,
  ArrowRightIcon,
  GitBranchIcon,
} from "lucide-react";

interface BehavioralAnalysisProps {
  leadership: IInterviewReport["behavioralAnalysis"]["leadership"];
  adaptability: IInterviewReport["behavioralAnalysis"]["adaptability"];
  collaboration: IInterviewReport["behavioralAnalysis"]["collaboration"];
}

const BehavioralAnalysis: FC<BehavioralAnalysisProps> = ({ leadership, adaptability, collaboration }) => {
  const AnalysisSection = ({
    title,
    content,
    icon,
    accentColor = "blue",
  }: {
    title: string;
    content: string;
    icon: React.ReactNode;
    accentColor?: "blue" | "green" | "purple" | "orange";
  }) => {
    const colorClasses = {
      blue: "bg-blue-50 border-l-blue-500 dark:bg-blue-950/30",
      green: "bg-green-50 border-l-green-500 dark:bg-green-950/30",
      purple: "bg-purple-50 border-l-purple-500 dark:bg-purple-950/30",
      orange: "bg-orange-50 border-l-orange-500 dark:bg-orange-950/30",
    };

    return (
      <div className={`rounded-lg border-l-4 p-4 ${colorClasses[accentColor]}`}>
        <div className="mb-2 flex items-center gap-2">
          {icon}
          <span className="font-semibold">{title}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
      </div>
    );
  };

  const InitiativeCard = ({
    example,
    impact,
    context,
    index,
  }: {
    example: string;
    impact: string;
    context: string;
    index: number;
  }) => (
    <div className="relative rounded-lg border bg-gradient-to-r from-slate-50 to-slate-100 p-4 dark:from-slate-900/50 dark:to-slate-800/50">
      <div className="absolute top-2 left-2">
        <Badge variant="secondary" className="h-6 w-6 rounded-full p-0 text-xs">
          {index + 1}
        </Badge>
      </div>
      <div className="space-y-3 pl-6">
        <div>
          <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-100">Initiative</h4>
          <p className="text-muted-foreground text-sm leading-relaxed">{example}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-md bg-green-50 p-3 dark:bg-green-950/30">
            <div className="mb-1 flex items-center gap-1">
              <TargetIcon className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800 dark:text-green-300">Impact</span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400">{impact}</p>
          </div>
          <div className="rounded-md bg-blue-50 p-3 dark:bg-blue-950/30">
            <div className="mb-1 flex items-center gap-1">
              <BrainIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Context</span>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-400">{context}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Leadership Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CrownIcon className="h-5 w-5 text-amber-600" />
            Leadership Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Core Leadership Skills */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <StarIcon className="h-4 w-4" />
                Core Leadership Capabilities
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <AnalysisSection
                  title="Decision Making"
                  content={leadership.decisionMaking}
                  icon={<LightbulbIcon className="h-4 w-4 text-blue-500" />}
                  accentColor="blue"
                />
                <AnalysisSection
                  title="Team Influence"
                  content={leadership.teamInfluence}
                  icon={<UsersIcon className="h-4 w-4 text-green-500" />}
                  accentColor="green"
                />
              </div>
            </div>

            {/* Initiative Examples */}
            {leadership.initiative && leadership.initiative.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <TrendingUpIcon className="h-4 w-4" />
                  Leadership Initiatives ({leadership.initiative.length})
                </h3>
                <div className="space-y-4">
                  {leadership.initiative.map((item, index) => (
                    <InitiativeCard
                      key={index}
                      example={item.example}
                      impact={item.impact}
                      context={item.context}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Adaptability Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <GitBranchIcon className="h-5 w-5 text-purple-600" />
            Adaptability & Growth Mindset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnalysisSection
              title="Change Response"
              content={adaptability.changeResponse}
              icon={<TrendingUpIcon className="h-4 w-4 text-purple-500" />}
              accentColor="purple"
            />
            <AnalysisSection
              title="Learning Approach"
              content={adaptability.learning}
              icon={<BrainIcon className="h-4 w-4 text-blue-500" />}
              accentColor="blue"
            />
            <AnalysisSection
              title="Professional Growth"
              content={adaptability.growth}
              icon={<ArrowRightIcon className="h-4 w-4 text-green-500" />}
              accentColor="green"
            />
          </div>
        </CardContent>
      </Card>

      {/* Collaboration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UsersIcon className="h-5 w-5 text-blue-600" />
            Collaboration & Teamwork
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Core Collaboration Skills */}
            <div className="grid gap-4 md:grid-cols-2">
              <AnalysisSection
                title="Teamwork Style"
                content={collaboration.teamwork}
                icon={<UsersIcon className="h-4 w-4 text-blue-500" />}
                accentColor="blue"
              />
              <AnalysisSection
                title="Communication Approach"
                content={collaboration.communication}
                icon={<MessageSquareIcon className="h-4 w-4 text-green-500" />}
                accentColor="green"
              />
            </div>

            {/* Cross-Team Collaboration */}
            {collaboration.crossTeam && collaboration.crossTeam.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <GitBranchIcon className="h-4 w-4" />
                  Cross-Team Collaboration Highlights
                </h3>
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <div className="grid gap-3 md:grid-cols-2">
                    {collaboration.crossTeam.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-md bg-white/60 p-3 dark:bg-slate-800/60"
                      >
                        <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                        <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
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
            <LightbulbIcon className="h-5 w-5 text-orange-600" />
            Behavioral Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-950/30">
              <CrownIcon className="mx-auto mb-2 h-8 w-8 text-amber-600" />
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Leadership</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                {(leadership.initiative?.length ?? 0) > 0 ? "Strong initiative demonstrated" : "Potential for growth"}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <GitBranchIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Adaptability</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">Shows growth mindset</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <UsersIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Collaboration</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                {collaboration.crossTeam.length > 0 ? "Cross-functional experience" : "Team-focused approach"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BehavioralAnalysis;
