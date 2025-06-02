import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/types";
import {
  ActivityIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CrownIcon,
  EditIcon,
  FileTextIcon,
  RocketIcon,
  StarIcon,
  TargetIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";

interface ProfessionalNarrativeProps {
  professionalNarrative: IApplicationFeedback["professional_narrative"];
  competitiveAdvantages: IApplicationFeedback["competitive_advantages"];
}

const ProfessionalNarrative: React.FC<ProfessionalNarrativeProps> = ({
  professionalNarrative,
  competitiveAdvantages,
}) => {
  // Calculate summary statistics
  const totalImprovements = professionalNarrative?.summary_optimization?.key_improvements?.length || 0;
  const totalStoryElements = professionalNarrative?.story_strengthening?.length || 0;
  const totalUniquePoints = competitiveAdvantages?.unique_selling_points?.length || 0;
  const totalOpportunities = competitiveAdvantages?.differentiation_opportunities?.length || 0;

  const SummaryOptimizationCard = () => (
    <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30">
      <div className="mb-4 flex items-center gap-2">
        <EditIcon className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-blue-800 dark:text-blue-300">Summary Optimization</h3>
      </div>

      <div className="space-y-4">
        {/* Current vs Enhanced Comparison */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Summary:</p>
              <div className="mt-1 rounded-md bg-gray-100 p-4 dark:bg-gray-800">
                <p className="text-sm text-gray-800 dark:text-gray-300">
                  {professionalNarrative?.summary_optimization?.current}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRightIcon className="h-6 w-6 text-blue-600" />
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">Enhanced Version:</p>
            <div className="mt-1 rounded-md bg-green-100 p-4 dark:bg-green-900/40">
              <p className="text-sm text-green-800 dark:text-green-300">
                {professionalNarrative?.summary_optimization?.enhanced_version}
              </p>
            </div>
          </div>
        </div>

        {/* Key Improvements */}
        {professionalNarrative?.summary_optimization?.key_improvements &&
          professionalNarrative.summary_optimization.key_improvements.length > 0 && (
            <div>
              <div className="mb-3 flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-green-800 dark:text-green-300">
                  Key Improvements ({professionalNarrative.summary_optimization.key_improvements.length})
                </h4>
              </div>
              <div className="space-y-2">
                {professionalNarrative.summary_optimization.key_improvements.map((improvement, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
                    <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    <span className="text-sm text-green-800 dark:text-green-300">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );

  const StoryCard = ({ story, index }: { story: any; index: number }) => (
    <div className="rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 dark:border-purple-800 dark:from-purple-950/30 dark:to-indigo-950/30">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-purple-800 dark:text-purple-300">{story.career_element}</h3>
        </div>
        <BookOpenIcon className="h-5 w-5 text-purple-600" />
      </div>

      <div className="space-y-4">
        {/* Current vs Suggested Presentation */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Presentation:</p>
            <div className="mt-1 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
              <p className="text-sm text-gray-800 dark:text-gray-300">{story.current_presentation}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-400">Suggested Narrative:</p>
            <div className="mt-1 rounded-md bg-purple-100 p-3 dark:bg-purple-900/40">
              <p className="text-sm text-purple-800 dark:text-purple-300">{story.suggested_narrative}</p>
            </div>
          </div>
        </div>

        {/* Strategic Value */}
        <div className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="mb-2 flex items-center gap-2">
            <TargetIcon className="h-4 w-4 text-blue-600" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">Strategic Value</h4>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-300">{story.strategic_value}</p>
        </div>
      </div>
    </div>
  );

  const OpportunityCard = ({ opportunity, index }: { opportunity: any; index: number }) => (
    <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 dark:border-amber-800 dark:from-amber-950/30 dark:to-orange-950/30">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-amber-800 dark:text-amber-300">{opportunity.area}</h3>
        </div>
        <RocketIcon className="h-5 w-5 text-amber-600" />
      </div>

      <div className="space-y-4">
        {/* Current State vs Enhancement */}
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">Current State:</p>
            <div className="mt-1 rounded-md bg-red-100 p-3 dark:bg-red-900/40">
              <p className="text-sm text-red-800 dark:text-red-300">{opportunity.current_state}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-green-700 dark:text-green-400">Enhancement Suggestion:</p>
            <div className="mt-1 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
              <p className="text-sm text-green-800 dark:text-green-300">{opportunity.enhancement_suggestion}</p>
            </div>
          </div>
        </div>

        {/* Expected Impact */}
        <div className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="mb-2 flex items-center gap-2">
            <TrendingUpIcon className="h-4 w-4 text-blue-600" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">Expected Impact</h4>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-300">{opportunity.expected_impact}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Professional Narrative Overview Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ActivityIcon className="h-5 w-5 text-blue-600" />
            Professional Narrative & Competitive Analysis Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center dark:from-blue-950/30 dark:to-indigo-950/30">
              <EditIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Improvements</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalImprovements}</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Key Enhancements</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-4 text-center dark:from-purple-950/30 dark:to-indigo-950/30">
              <BookOpenIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Story Elements</h3>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{totalStoryElements}</p>
              <p className="text-sm text-purple-600 dark:text-purple-500">To Strengthen</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center dark:from-green-950/30 dark:to-emerald-950/30">
              <StarIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Unique Points</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{totalUniquePoints}</p>
              <p className="text-sm text-green-600 dark:text-green-500">Selling Points</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-center dark:from-amber-950/30 dark:to-orange-950/30">
              <RocketIcon className="mx-auto mb-2 h-8 w-8 text-amber-600" />
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Opportunities</h3>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{totalOpportunities}</p>
              <p className="text-sm text-amber-600 dark:text-amber-500">Differentiation</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Narrative Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileTextIcon className="h-5 w-5 text-blue-600" />
            Professional Narrative Enhancement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Summary Optimization */}
            {professionalNarrative?.summary_optimization && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <EditIcon className="h-4 w-4 text-blue-600" />
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300">Summary Optimization</h3>
                </div>
                <SummaryOptimizationCard />
              </div>
            )}

            {/* Story Strengthening */}
            {professionalNarrative?.story_strengthening && professionalNarrative.story_strengthening.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300">
                    Story Strengthening ({professionalNarrative.story_strengthening.length})
                  </h3>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {professionalNarrative.story_strengthening.map((story, index) => (
                    <StoryCard key={index} story={story} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CrownIcon className="h-5 w-5 text-green-600" />
            Competitive Advantages & Differentiation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Unique Selling Points */}
            {competitiveAdvantages?.unique_selling_points && competitiveAdvantages.unique_selling_points.length > 0 && (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <StarIcon className="h-4 w-4 text-green-600" />
                  <h3 className="font-semibold text-green-800 dark:text-green-300">
                    Unique Selling Points ({competitiveAdvantages.unique_selling_points.length})
                  </h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {competitiveAdvantages.unique_selling_points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-green-50 p-4 dark:bg-green-950/30"
                    >
                      <StarIcon className="h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-green-800 dark:text-green-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Differentiation Opportunities */}
            {competitiveAdvantages?.differentiation_opportunities &&
              competitiveAdvantages.differentiation_opportunities.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <RocketIcon className="h-4 w-4 text-amber-600" />
                    <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                      Differentiation Opportunities ({competitiveAdvantages.differentiation_opportunities.length})
                    </h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {competitiveAdvantages.differentiation_opportunities.map((opportunity, index) => (
                      <OpportunityCard key={index} opportunity={opportunity} index={index} />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      {/* Narrative Optimization Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ZapIcon className="h-5 w-5 text-amber-600" />
            Narrative Optimization Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <EditIcon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Improvements</h3>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                {totalImprovements} key enhancement{totalImprovements !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <BookOpenIcon className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300">Stories</h3>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                {totalStoryElements} element{totalStoryElements !== 1 ? "s" : ""} to strengthen
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <StarIcon className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">USPs</h3>
              <p className="text-xs text-green-700 dark:text-green-400">
                {totalUniquePoints} unique point{totalUniquePoints !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-950/30">
              <RocketIcon className="mx-auto mb-2 h-6 w-6 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Opportunities</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                {totalOpportunities} differentiation{totalOpportunities !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* No Data State */}
      {!professionalNarrative?.summary_optimization &&
        !professionalNarrative?.story_strengthening?.length &&
        !competitiveAdvantages?.unique_selling_points?.length &&
        !competitiveAdvantages?.differentiation_opportunities?.length && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <FileTextIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  No Professional Narrative Data Available
                </h3>
                <p className="text-muted-foreground">
                  Professional narrative and competitive analysis will appear here once data is processed.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default ProfessionalNarrative;
