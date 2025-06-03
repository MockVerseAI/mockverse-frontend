import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/types";
import {
  ActivityIcon,
  AlertTriangleIcon,
  BrainIcon,
  BuildingIcon,
  CheckCircleIcon,
  HeartIcon,
  LightbulbIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";

interface IndustryFitProps {
  industryAlignment: IApplicationFeedback["industry_alignment"];
}

const IndustryFit: React.FC<IndustryFitProps> = ({ industryAlignment }) => {
  // Calculate summary statistics
  const totalHighlightedAreas = industryAlignment?.domain_expertise?.highlighted_areas?.length || 0;
  const totalAreasToEmphasize = industryAlignment?.domain_expertise?.areas_to_emphasize?.length || 0;
  const totalKnowledgeGaps = industryAlignment?.domain_expertise?.knowledge_gaps?.length || 0;
  const totalAlignmentPoints = industryAlignment?.company_culture_fit?.alignment_points?.length || 0;
  const totalAreasToHighlight = industryAlignment?.company_culture_fit?.areas_to_highlight?.length || 0;

  const DomainBadge = ({
    area,
    variant = "default",
    icon,
  }: {
    area: string;
    variant?: "default" | "secondary" | "destructive";
    icon?: React.ReactNode;
  }) => (
    <Badge variant={variant} className="flex items-center gap-1 px-3 py-1">
      {icon}
      {area}
    </Badge>
  );

  const AlignmentPointCard = ({ point, index }: { point: string; index: number }) => (
    <div className="flex items-start gap-3 rounded-lg bg-green-50 p-4 dark:bg-green-950/30">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
        {index + 1}
      </div>
      <div className="flex-1">
        <CheckCircleIcon className="mb-2 h-4 w-4 text-green-600" />
        <p className="text-sm text-green-800 dark:text-green-300">{point}</p>
      </div>
    </div>
  );

  const HighlightAreaCard = ({ area, index }: { area: string; index: number }) => (
    <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
        {index + 1}
      </div>
      <div className="flex-1">
        <LightbulbIcon className="mb-2 h-4 w-4 text-blue-600" />
        <p className="text-sm text-blue-800 dark:text-blue-300">{area}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Industry Fit Overview Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ActivityIcon className="h-5 w-5 text-blue-600" />
            Industry Alignment & Cultural Fit Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center dark:from-green-950/30 dark:to-emerald-950/30">
              <CheckCircleIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Highlighted</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{totalHighlightedAreas}</p>
              <p className="text-sm text-green-600 dark:text-green-500">Strong Areas</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center dark:from-blue-950/30 dark:to-indigo-950/30">
              <TrendingUpIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Emphasize</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalAreasToEmphasize}</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Focus Areas</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-red-50 to-pink-50 p-4 text-center dark:from-red-950/30 dark:to-pink-950/30">
              <AlertTriangleIcon className="mx-auto mb-2 h-8 w-8 text-red-600" />
              <h3 className="font-semibold text-red-800 dark:text-red-300">Gaps</h3>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">{totalKnowledgeGaps}</p>
              <p className="text-sm text-red-600 dark:text-red-500">Knowledge Gaps</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 p-4 text-center dark:from-purple-950/30 dark:to-indigo-950/30">
              <UsersIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Alignment</h3>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{totalAlignmentPoints}</p>
              <p className="text-sm text-purple-600 dark:text-purple-500">Culture Points</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 p-4 text-center dark:from-amber-950/30 dark:to-orange-950/30">
              <StarIcon className="mx-auto mb-2 h-8 w-8 text-amber-600" />
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Highlights</h3>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{totalAreasToHighlight}</p>
              <p className="text-sm text-amber-600 dark:text-amber-500">To Showcase</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry Analysis */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Domain Expertise */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BrainIcon className="h-5 w-5 text-blue-600" />
              Domain Expertise Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Highlighted Areas */}
              {industryAlignment?.domain_expertise?.highlighted_areas &&
                industryAlignment.domain_expertise.highlighted_areas.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600" />
                      <h3 className="font-semibold text-green-800 dark:text-green-300">
                        Highlighted Strengths ({industryAlignment.domain_expertise.highlighted_areas.length})
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {industryAlignment.domain_expertise.highlighted_areas.map((area) => (
                        <DomainBadge
                          key={area}
                          area={area}
                          variant="default"
                          icon={<CheckCircleIcon className="h-3 w-3" />}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* Areas to Emphasize */}
              {industryAlignment?.domain_expertise?.areas_to_emphasize &&
                industryAlignment.domain_expertise.areas_to_emphasize.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                      <h3 className="font-semibold text-blue-800 dark:text-blue-300">
                        Areas to Emphasize ({industryAlignment.domain_expertise.areas_to_emphasize.length})
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {industryAlignment.domain_expertise.areas_to_emphasize.map((area) => (
                        <DomainBadge
                          key={area}
                          area={area}
                          variant="secondary"
                          icon={<TrendingUpIcon className="h-3 w-3" />}
                        />
                      ))}
                    </div>
                  </div>
                )}

              {/* Knowledge Gaps */}
              {industryAlignment?.domain_expertise?.knowledge_gaps &&
                industryAlignment.domain_expertise.knowledge_gaps.length > 0 && (
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <AlertTriangleIcon className="h-4 w-4 text-red-600" />
                      <h3 className="font-semibold text-red-800 dark:text-red-300">
                        Knowledge Gaps to Address ({industryAlignment.domain_expertise.knowledge_gaps.length})
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {industryAlignment.domain_expertise.knowledge_gaps.map((gap) => (
                        <div key={gap} className="flex items-center gap-3 rounded-md bg-red-50 p-3 dark:bg-red-950/30">
                          <AlertTriangleIcon className="h-4 w-4 shrink-0 text-red-600" />
                          <span className="text-red-800 dark:text-red-300">{gap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>

        {/* Company Culture Fit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UsersIcon className="h-5 w-5 text-purple-600" />
              Company Culture Alignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Alignment Points */}
              {industryAlignment?.company_culture_fit?.alignment_points &&
                industryAlignment.company_culture_fit.alignment_points.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <HeartIcon className="h-4 w-4 text-purple-600" />
                      <h3 className="font-semibold text-purple-800 dark:text-purple-300">
                        Cultural Alignment Points ({industryAlignment.company_culture_fit.alignment_points.length})
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {industryAlignment.company_culture_fit.alignment_points.map((point, index) => (
                        <AlignmentPointCard key={index} point={point} index={index} />
                      ))}
                    </div>
                  </div>
                )}

              {/* Areas to Highlight */}
              {industryAlignment?.company_culture_fit?.areas_to_highlight &&
                industryAlignment.company_culture_fit.areas_to_highlight.length > 0 && (
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <StarIcon className="h-4 w-4 text-amber-600" />
                      <h3 className="font-semibold text-amber-800 dark:text-amber-300">
                        Areas to Highlight ({industryAlignment.company_culture_fit.areas_to_highlight.length})
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {industryAlignment.company_culture_fit.areas_to_highlight.map((area, index) => (
                        <HighlightAreaCard key={index} area={area} index={index} />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Industry Fit Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ZapIcon className="h-5 w-5 text-amber-600" />
            Industry Alignment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <CheckCircleIcon className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">Strengths</h3>
              <p className="text-xs text-green-700 dark:text-green-400">
                {totalHighlightedAreas} highlighted area{totalHighlightedAreas !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <TrendingUpIcon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Focus</h3>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                {totalAreasToEmphasize} area{totalAreasToEmphasize !== 1 ? "s" : ""} to emphasize
              </p>
            </div>
            <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-950/30">
              <AlertTriangleIcon className="mx-auto mb-2 h-6 w-6 text-red-600" />
              <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">Gaps</h3>
              <p className="text-xs text-red-700 dark:text-red-400">
                {totalKnowledgeGaps} knowledge gap{totalKnowledgeGaps !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <UsersIcon className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300">Culture</h3>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                {totalAlignmentPoints} alignment point{totalAlignmentPoints !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-950/30">
              <StarIcon className="mx-auto mb-2 h-6 w-6 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Showcase</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                {totalAreasToHighlight} highlight{totalAreasToHighlight !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* No Data State */}
      {!industryAlignment?.domain_expertise?.highlighted_areas?.length &&
        !industryAlignment?.domain_expertise?.areas_to_emphasize?.length &&
        !industryAlignment?.domain_expertise?.knowledge_gaps?.length &&
        !industryAlignment?.company_culture_fit?.alignment_points?.length &&
        !industryAlignment?.company_culture_fit?.areas_to_highlight?.length && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <BuildingIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  No Industry Alignment Data Available
                </h3>
                <p className="text-muted-foreground">
                  Industry fit and cultural alignment analysis will appear here once data is processed.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default IndustryFit;
