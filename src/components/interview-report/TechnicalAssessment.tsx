import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IInterviewReport } from "@/types";
import {
  AlertTriangleIcon,
  AwardIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  CodeIcon,
  LayersIcon,
  LightbulbIcon,
  MessageSquareIcon,
  PaletteIcon,
  PuzzleIcon,
  ScaleIcon,
  SearchIcon,
  TargetIcon,
  TrendingUpIcon,
  XCircleIcon,
} from "lucide-react";
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
  const getSkillLevelBadge = (level: string) => {
    const normalizedLevel = level?.toLowerCase();
    if (normalizedLevel?.includes("expert") || normalizedLevel?.includes("advanced")) return "success";
    if (normalizedLevel?.includes("intermediate") || normalizedLevel?.includes("proficient")) return "secondary";
    return "outline";
  };

  const getSkillLevelProgress = (level: string) => {
    const normalizedLevel = level?.toLowerCase();
    if (normalizedLevel?.includes("expert")) return 100;
    if (normalizedLevel?.includes("advanced")) return 85;
    if (normalizedLevel?.includes("proficient")) return 70;
    if (normalizedLevel?.includes("intermediate")) return 55;
    if (normalizedLevel?.includes("basic")) return 40;
    if (normalizedLevel?.includes("beginner")) return 25;
    return 50;
  };

  const SkillCard = ({
    skill,
    level,
    evidence,
    type = "demonstrated",
  }: {
    skill: string;
    level: string;
    evidence?: string;
    type?: "demonstrated" | "required" | "gap";
  }) => {
    const progress = getSkillLevelProgress(level);
    const colorClasses = {
      demonstrated: "bg-green-50 border-l-green-500 dark:bg-green-950/30",
      required: "bg-blue-50 border-l-blue-500 dark:bg-blue-950/30",
      gap: "bg-orange-50 border-l-orange-500 dark:bg-orange-950/30",
    };

    const iconClasses = {
      demonstrated: "text-green-600",
      required: "text-blue-600",
      gap: "text-orange-600",
    };

    return (
      <div className={`rounded-lg border-l-4 p-4 ${colorClasses[type]}`}>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <CodeIcon className={`h-4 w-4 ${iconClasses[type]}`} />
              <span className="font-semibold">{skill}</span>
            </div>
            <Badge variant={getSkillLevelBadge(level)} className="text-xs">
              {level}
            </Badge>
          </div>

          {type !== "gap" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Proficiency</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {evidence && <p className="text-muted-foreground text-sm leading-relaxed">{evidence}</p>}
        </div>
      </div>
    );
  };

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

  const SkillMatchCard = ({ skill, isMatched }: { skill: string; isMatched: boolean }) => (
    <div
      className={`flex items-center gap-2 rounded-md p-2 ${isMatched ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
    >
      {isMatched ? (
        <CheckCircleIcon className="h-4 w-4 text-green-600" />
      ) : (
        <XCircleIcon className="h-4 w-4 text-red-600" />
      )}
      <span
        className={`text-sm font-medium ${isMatched ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}
      >
        {skill}
      </span>
    </div>
  );

  const demonstratedSkills = skillsAnalysis?.demonstrated || [];
  const requiredSkills = skillsAnalysis?.required || [];
  const skillGaps = skillsAnalysis?.gaps || [];

  const matchedSkills = requiredSkills?.filter((req) => demonstratedSkills?.some((demo) => demo?.skill === req?.skill));
  const missingSkills = requiredSkills?.filter(
    (req) => !demonstratedSkills?.some((demo) => demo?.skill === req?.skill)
  );

  const skillMatchPercentage =
    requiredSkills?.length > 0 ? Math.round((matchedSkills?.length / requiredSkills?.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TargetIcon className="h-5 w-5 text-blue-600" />
            Skills Assessment Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <CheckCircleIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Demonstrated</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{demonstratedSkills?.length}</p>
              <p className="text-sm text-green-600 dark:text-green-500">Skills shown</p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <ClipboardListIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Required</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{requiredSkills?.length}</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Skills needed</p>
            </div>

            <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-950/30">
              <AlertTriangleIcon className="mx-auto mb-2 h-8 w-8 text-orange-600" />
              <h3 className="font-semibold text-orange-800 dark:text-orange-300">Gaps</h3>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{skillGaps?.length}</p>
              <p className="text-sm text-orange-600 dark:text-orange-500">Areas to improve</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CodeIcon className="h-5 w-5 text-green-600" />
            Detailed Skills Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Demonstrated Skills */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
                Demonstrated Skills ({demonstratedSkills?.length})
              </h3>
              {demonstratedSkills?.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {demonstratedSkills?.map((skill, index) => (
                    <SkillCard
                      key={index}
                      skill={skill?.skill}
                      level={skill?.level}
                      evidence={skill?.evidence}
                      type="demonstrated"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No demonstrated skills recorded.</p>
              )}
            </div>

            {/* Required Skills Status */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <ClipboardListIcon className="h-4 w-4 text-blue-600" />
                Required Skills Analysis ({requiredSkills?.length})
              </h3>
              {requiredSkills?.length > 0 ? (
                <div className="space-y-4">
                  {matchedSkills?.length > 0 && (
                    <div>
                      <h4 className="mb-2 font-medium text-green-800 dark:text-green-300">✓ Met Requirements</h4>
                      <div className="grid gap-2 md:grid-cols-3">
                        {matchedSkills?.map((skill, index) => (
                          <SkillMatchCard key={index} skill={skill?.skill} isMatched={true} />
                        ))}
                      </div>
                    </div>
                  )}

                  {missingSkills?.length > 0 && (
                    <div>
                      <h4 className="mb-2 font-medium text-red-800 dark:text-red-300">⚠ Unmet Requirements</h4>
                      <div className="grid gap-2 md:grid-cols-3">
                        {missingSkills?.map((skill, index) => (
                          <SkillMatchCard key={index} skill={skill?.skill} isMatched={false} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No required skills specified.</p>
              )}
            </div>

            {/* Skill Gaps */}
            {skillGaps?.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <AlertTriangleIcon className="h-4 w-4 text-orange-600" />
                  Skill Development Areas ({skillGaps?.length})
                </h3>
                <div className="space-y-3">
                  {skillGaps?.map((gap, index) => (
                    <div key={index} className="rounded-lg border bg-orange-50 p-4 dark:bg-orange-950/30">
                      <div className="flex items-start gap-3">
                        <TrendingUpIcon className="mt-1 h-4 w-4 text-orange-600" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-orange-900 dark:text-orange-100">{gap?.skill}</h4>
                          <p className="mt-1 text-sm text-orange-700 dark:text-orange-300">{gap?.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Problem Solving Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <PuzzleIcon className="h-5 w-5 text-purple-600" />
            Problem Solving Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <AnalysisSection
              title="Analytical Thinking"
              content={problemSolving?.analytical}
              icon={<SearchIcon className="h-4 w-4 text-blue-500" />}
              accentColor="blue"
            />
            <AnalysisSection
              title="Design Approach"
              content={problemSolving?.design}
              icon={<PaletteIcon className="h-4 w-4 text-purple-500" />}
              accentColor="purple"
            />
            <AnalysisSection
              title="Scalability Thinking"
              content={problemSolving?.scalability}
              icon={<ScaleIcon className="h-4 w-4 text-green-500" />}
              accentColor="green"
            />
          </div>
        </CardContent>
      </Card>

      {/* Technical Communication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquareIcon className="h-5 w-5 text-indigo-600" />
            Technical Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <AnalysisSection
              title="Communication Clarity"
              content={technicalCommunication?.clarity}
              icon={<LightbulbIcon className="h-4 w-4 text-blue-500" />}
              accentColor="blue"
            />
            <AnalysisSection
              title="Technical Depth"
              content={technicalCommunication?.depth}
              icon={<LayersIcon className="h-4 w-4 text-green-500" />}
              accentColor="green"
            />
          </div>
        </CardContent>
      </Card>

      {/* Assessment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AwardIcon className="h-5 w-5 text-amber-600" />
            Technical Assessment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <CodeIcon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Skills</h3>
              <p className="text-xs text-blue-700 dark:text-blue-400">{skillMatchPercentage}% match rate</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <PuzzleIcon className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300">Problem Solving</h3>
              <p className="text-xs text-purple-700 dark:text-purple-400">3 areas assessed</p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4 text-center dark:bg-indigo-950/30">
              <MessageSquareIcon className="mx-auto mb-2 h-6 w-6 text-indigo-600" />
              <h3 className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">Communication</h3>
              <p className="text-xs text-indigo-700 dark:text-indigo-400">2 aspects evaluated</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-950/30">
              <TrendingUpIcon className="mx-auto mb-2 h-6 w-6 text-orange-600" />
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300">Growth Areas</h3>
              <p className="text-xs text-orange-700 dark:text-orange-400">
                {skillGaps?.length} recommendation{skillGaps?.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalAssessment;
