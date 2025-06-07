import Message from "@/components/cards/Message";
import { IMediaAnalysis, IMediaAnalysisData, IMessage } from "@/types";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import DualAudioWaveform from "../DualAudioWaveform";
import {
  CheckCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  VideoIcon,
  MicIcon,
  VolumeXIcon,
  EyeIcon,
  MessageSquareIcon,
  StarIcon,
} from "lucide-react";

interface InterviewAnalysisProps {
  messages: IMessage[];
  recordings: {
    voice: {
      combined: string;
      assistant: string;
      user: string;
    };
    video?: string;
  };
  analysis: IMediaAnalysis;
  isAgentMode?: boolean;
}

const InterviewAnalysis: FC<InterviewAnalysisProps> = ({ messages, recordings, analysis, isAgentMode }) => {
  const analysisData: IMediaAnalysisData = analysis?.analysis;

  const getScoreBadgeVariant = (score: number | null) => {
    if (score === null || score === undefined) return "secondary";
    if (score >= 8) return "success";
    if (score >= 6) return "secondary";
    return "destructive";
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return <AlertCircleIcon className="h-4 w-4 text-red-500" />;
      case "medium":
        return <TrendingUpIcon className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const ScoreSection = ({
    title,
    score,
    feedback,
    icon,
  }: {
    title: string;
    score: number | null;
    feedback: string | null;
    icon: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <Badge variant={getScoreBadgeVariant(score)}>{score ? `${score}/10` : "N/A"}</Badge>
      </div>
      {score !== null && score !== undefined && <Progress value={score * 10} className="h-2" />}
      {feedback && <p className="text-muted-foreground text-sm">{feedback}</p>}
    </div>
  );

  if (!analysis?.isCompleted || !isAgentMode) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div
            className="scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 mx-auto w-full max-w-5xl overflow-y-auto p-4"
            style={{ maxHeight: "40vh" }}
          >
            {messages?.map((message: IMessage, index: number) => (
              <Message key={index} message={message} className="max-w-xs md:max-w-xs lg:max-w-md xl:max-w-xl" />
            ))}
          </div>
          {isAgentMode ? (
            <div className="flex aspect-video w-full flex-col gap-4">
              {recordings?.video ? (
                <video className="w-full rounded-lg" controls>
                  <source src={recordings?.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <DualAudioWaveform
                  userAudioUrl={recordings?.voice?.user}
                  assistantAudioUrl={recordings?.voice?.assistant}
                  combinedAudioUrl={recordings?.voice?.combined}
                  title="Interview Recording"
                  className="h-full"
                  height={50}
                />
              )}
            </div>
          ) : null}
        </div>
        {isAgentMode ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">The analysis is still in progress. Please check back later.</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className="scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 mx-auto w-full max-w-5xl overflow-y-auto p-4"
          style={{ maxHeight: "40vh" }}
        >
          {messages?.map((message: IMessage, index: number) => (
            <Message key={index} message={message} className="max-w-xs md:max-w-xs lg:max-w-md xl:max-w-xl" />
          ))}
        </div>
        <div className="flex aspect-video w-full flex-col gap-4">
          {analysis?.type === "video" ? (
            <video className="w-full rounded-lg" controls>
              <source src={recordings?.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <DualAudioWaveform
              userAudioUrl={recordings?.voice?.user}
              assistantAudioUrl={recordings?.voice?.assistant}
              combinedAudioUrl={recordings?.voice?.combined}
              title="Interview Recording"
              className="h-full"
              height={50}
            />
          )}
        </div>
      </div>

      {/* Analysis Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {analysis?.type === "video" ? <VideoIcon className="h-5 w-5" /> : <MicIcon className="h-5 w-5" />}
            {analysis?.type === "video" ? "Video & Audio Analysis" : "Audio Analysis"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
              <h3 className="mb-2 font-semibold text-blue-800 dark:text-blue-300">Analysis Type</h3>
              <Badge variant="outline" className="capitalize">
                {analysis?.type || "Unknown"}
              </Badge>
            </div>

            {analysisData?.summary?.overallScore && (
              <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
                <h3 className="mb-2 font-semibold text-green-800 dark:text-green-300">Overall Score</h3>
                <div className="flex items-center gap-2">
                  <Badge variant={getScoreBadgeVariant(analysisData?.summary?.overallScore)}>
                    {analysisData?.summary?.overallScore}/10
                  </Badge>
                  <Progress value={(analysisData?.summary?.overallScore || 0) * 10} className="h-2 flex-1" />
                </div>
              </div>
            )}

            {analysis?.processingDuration && (
              <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-950/30">
                <h3 className="mb-2 font-semibold text-purple-800 dark:text-purple-300">Processing Time</h3>
                <p className="text-sm">{analysis?.processingDuration}ms</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Communication Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareIcon className="h-5 w-5" />
            Communication Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            <ScoreSection
              title="Clarity"
              score={analysisData?.communicationSkills?.clarity?.score}
              feedback={analysisData?.communicationSkills?.clarity?.feedback}
              icon={<CheckCircleIcon className="h-4 w-4" />}
            />
            <ScoreSection
              title="Articulation"
              score={analysisData?.communicationSkills?.articulation?.score}
              feedback={analysisData?.communicationSkills?.articulation?.feedback}
              icon={<MessageSquareIcon className="h-4 w-4" />}
            />
            <ScoreSection
              title="Pace"
              score={analysisData?.communicationSkills?.pace?.score}
              feedback={analysisData?.communicationSkills?.pace?.feedback}
              icon={<TrendingUpIcon className="h-4 w-4" />}
            />
            <ScoreSection
              title="Confidence"
              score={analysisData?.communicationSkills?.confidence?.score}
              feedback={analysisData?.communicationSkills?.confidence?.feedback}
              icon={<StarIcon className="h-4 w-4" />}
            />
          </div>

          {/* Examples and Indicators */}
          {((analysisData?.communicationSkills?.clarity?.examples?.length || 0) > 0 ||
            (analysisData?.communicationSkills?.confidence?.indicators?.length || 0) > 0) && (
            <div className="mt-6 space-y-4">
              {(analysisData?.communicationSkills?.clarity?.examples?.length || 0) > 0 && (
                <div>
                  <h4 className="mb-2 font-medium">Clarity Examples</h4>
                  <ul className="list-disc pl-4 text-sm">
                    {analysisData?.communicationSkills?.clarity?.examples?.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              {(analysisData?.communicationSkills?.confidence?.indicators?.length || 0) > 0 && (
                <div>
                  <h4 className="mb-2 font-medium">Confidence Indicators</h4>
                  <ul className="list-disc pl-4 text-sm">
                    {analysisData?.communicationSkills?.confidence?.indicators?.map((indicator, index) => (
                      <li key={index}>{indicator}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Body Language (Video Only) */}
      {analysis?.type === "video" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EyeIcon className="h-5 w-5" />
              Body Language Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
              <ScoreSection
                title="Posture"
                score={analysisData?.bodyLanguage?.posture?.score}
                feedback={analysisData?.bodyLanguage?.posture?.feedback}
                icon={<TrendingUpIcon className="h-4 w-4" />}
              />
              <ScoreSection
                title="Eye Contact"
                score={analysisData?.bodyLanguage?.eyeContact?.score}
                feedback={analysisData?.bodyLanguage?.eyeContact?.feedback}
                icon={<EyeIcon className="h-4 w-4" />}
              />
              <ScoreSection
                title="Gestures"
                score={analysisData?.bodyLanguage?.gestures?.score}
                feedback={analysisData?.bodyLanguage?.gestures?.feedback}
                icon={<StarIcon className="h-4 w-4" />}
              />
              <ScoreSection
                title="Presence"
                score={analysisData?.bodyLanguage?.presence?.score}
                feedback={analysisData?.bodyLanguage?.presence?.feedback}
                icon={<CheckCircleIcon className="h-4 w-4" />}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audio Quality */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <VolumeXIcon className="h-5 w-5" />
            Audio Quality
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-x-8 gap-y-4 md:grid-cols-3">
            <ScoreSection
              title="Audio Clarity"
              score={analysisData?.audioQuality?.clarity?.score}
              feedback={analysisData?.audioQuality?.clarity?.feedback}
              icon={<CheckCircleIcon className="h-4 w-4" />}
            />
            <ScoreSection
              title="Volume Level"
              score={analysisData?.audioQuality?.volume?.score}
              feedback={analysisData?.audioQuality?.volume?.feedback}
              icon={<VolumeXIcon className="h-4 w-4" />}
            />
            <ScoreSection
              title="Background Noise"
              score={analysisData?.audioQuality?.background?.score}
              feedback={analysisData?.audioQuality?.background?.feedback}
              icon={<AlertCircleIcon className="h-4 w-4" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Overall Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StarIcon className="h-5 w-5" />
            Overall Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <ScoreSection
              title="Professionalism"
              score={analysisData?.overallPerformance?.professionalism?.score}
              feedback={analysisData?.overallPerformance?.professionalism?.feedback}
              icon={<CheckCircleIcon className="h-4 w-4" />}
            />
            <ScoreSection
              title="Engagement"
              score={analysisData?.overallPerformance?.engagement?.score}
              feedback={analysisData?.overallPerformance?.engagement?.feedback}
              icon={<TrendingUpIcon className="h-4 w-4" />}
            />
            <ScoreSection
              title="Interview Readiness"
              score={analysisData?.overallPerformance?.readiness?.score}
              feedback={analysisData?.overallPerformance?.readiness?.feedback}
              icon={<StarIcon className="h-4 w-4" />}
            />
          </div>

          {analysisData?.overallPerformance?.readiness?.assessment && (
            <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-950/30">
              <h4 className="mb-2 font-medium">Readiness Assessment</h4>
              <p className="text-sm">{analysisData?.overallPerformance?.readiness?.assessment}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Immediate Actions */}
            {(analysisData?.recommendations?.immediate?.length || 0) > 0 && (
              <div>
                <h3 className="mb-3 font-semibold">Immediate Actions</h3>
                <div className="space-y-2">
                  {analysisData?.recommendations?.immediate?.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                      {getPriorityIcon(rec?.priority)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{rec?.area}</span>
                          <Badge variant="outline" className="capitalize">
                            {rec?.priority}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{rec?.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practice Exercises */}
            {(analysisData?.recommendations?.practice?.length || 0) > 0 && (
              <div>
                <h3 className="mb-3 font-semibold">Practice Exercises</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {analysisData?.recommendations?.practice?.map((practice, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <h4 className="font-medium">{practice?.skill}</h4>
                      <p className="text-muted-foreground text-sm">{practice?.exercise}</p>
                      <Badge variant="outline" className="mt-2">
                        {practice?.frequency}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resources */}
            {(analysisData?.recommendations?.resources?.length || 0) > 0 && (
              <div>
                <h3 className="mb-3 font-semibold">Recommended Resources</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {analysisData?.recommendations?.resources?.map((resource, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{resource?.type}</Badge>
                      </div>
                      <p className="mt-1 text-sm">{resource?.description}</p>
                      {resource?.link && (
                        <a
                          href={resource?.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-sm text-blue-600 hover:underline"
                        >
                          View Resource →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {((analysisData?.summary?.strengths?.length || 0) > 0 ||
        (analysisData?.summary?.weaknesses?.length || 0) > 0 ||
        (analysisData?.summary?.keyInsights?.length || 0) > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {/* Strengths */}
              {(analysisData?.summary?.strengths?.length || 0) > 0 && (
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-800 dark:text-green-300">
                    <CheckCircleIcon className="h-5 w-5" />
                    Strengths
                  </h3>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-400">
                    {analysisData?.summary?.strengths?.map((strength, index) => <li key={index}>• {strength}</li>)}
                  </ul>
                </div>
              )}

              {/* Areas for Improvement */}
              {(analysisData?.summary?.weaknesses?.length || 0) > 0 && (
                <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-950/30">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-orange-800 dark:text-orange-300">
                    <TrendingDownIcon className="h-5 w-5" />
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-400">
                    {analysisData?.summary?.weaknesses?.map((weakness, index) => <li key={index}>• {weakness}</li>)}
                  </ul>
                </div>
              )}

              {/* Key Insights */}
              {(analysisData?.summary?.keyInsights?.length || 0) > 0 && (
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-300">
                    <AlertCircleIcon className="h-5 w-5" />
                    Key Insights
                  </h3>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                    {analysisData?.summary?.keyInsights?.map((insight, index) => <li key={index}>• {insight}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewAnalysis;
