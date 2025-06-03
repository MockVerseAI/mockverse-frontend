import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IApplicationFeedback } from "@/types";
import {
  ActivityIcon,
  ArrowRightIcon,
  AwardIcon,
  BarChart3Icon,
  CheckCircleIcon,
  DatabaseIcon,
  LightbulbIcon,
  PlusIcon,
  TargetIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";
import React from "react";

interface ImpactMetricsProps {
  impactMetrics: IApplicationFeedback["impact_metrics"];
}

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ impactMetrics }) => {
  // Calculate summary statistics
  const totalAdditionsNeeded = impactMetrics?.additions_needed?.length || 0;
  const totalMetricsToEnhance = impactMetrics?.metrics_to_enhance?.length || 0;
  const totalDataPoints =
    impactMetrics?.additions_needed?.reduce(
      (total, addition) => total + (addition?.data_points_to_gather?.length || 0),
      0
    ) || 0;
  const totalSuggestedMetrics =
    impactMetrics?.additions_needed?.reduce(
      (total, addition) => total + (addition?.suggested_metrics?.length || 0),
      0
    ) || 0;

  const AdditionCard = ({ addition, index }: { addition: any; index: number }) => (
    <div className="rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300">{addition?.achievement}</h3>
        </div>
        <PlusIcon className="h-5 w-5 text-blue-600" />
      </div>

      <div className="space-y-4">
        {/* Suggested Metrics */}
        {addition?.suggested_metrics && addition?.suggested_metrics?.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <BarChart3Icon className="h-4 w-4 text-green-600" />
              <h4 className="font-semibold text-green-800 dark:text-green-300">
                Suggested Metrics ({addition?.suggested_metrics?.length})
              </h4>
            </div>
            <div className="space-y-2">
              {addition?.suggested_metrics?.map((metric: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
                  <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <span className="text-sm text-green-800 dark:text-green-300">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Points to Gather */}
        {addition?.data_points_to_gather && addition?.data_points_to_gather?.length > 0 && (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <DatabaseIcon className="h-4 w-4 text-purple-600" />
              <h4 className="font-semibold text-purple-800 dark:text-purple-300">
                Data Points to Gather ({addition?.data_points_to_gather?.length})
              </h4>
            </div>
            <div className="space-y-2">
              {addition?.data_points_to_gather?.map((point: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 rounded-md bg-purple-100 p-3 dark:bg-purple-900/40">
                  <TargetIcon className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                  <span className="text-sm text-purple-800 dark:text-purple-300">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const EnhancementCard = ({ metric, index }: { metric: any; index: number }) => (
    <div className="rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6 dark:border-orange-800 dark:from-orange-950/30 dark:to-red-950/30">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white">
          {index + 1}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-orange-800 dark:text-orange-300">Metric Enhancement</h3>
        </div>
        <TrendingUpIcon className="h-5 w-5 text-orange-600" />
      </div>

      <div className="space-y-4">
        {/* Current vs Enhanced Comparison */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Metric:</p>
              <div className="mt-1 rounded-md bg-gray-100 p-3 dark:bg-gray-800">
                <p className="text-sm text-gray-800 dark:text-gray-300">{metric?.current_metric}</p>
              </div>
            </div>
            <ArrowRightIcon className="h-4 w-4 text-orange-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">Enhanced Version:</p>
              <div className="mt-1 rounded-md bg-green-100 p-3 dark:bg-green-900/40">
                <p className="text-sm text-green-800 dark:text-green-300">{metric?.enhanced_version}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Rationale */}
        <div className="rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="mb-2 flex items-center gap-2">
            <LightbulbIcon className="h-4 w-4 text-blue-600" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">Improvement Rationale</h4>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-300">{metric?.improvement_rationale}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Impact Metrics Overview Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ActivityIcon className="h-5 w-5 text-blue-600" />
            Impact Metrics Optimization Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 text-center dark:from-blue-950/30 dark:to-indigo-950/30">
              <PlusIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">New Additions</h3>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalAdditionsNeeded}</p>
              <p className="text-sm text-blue-600 dark:text-blue-500">Achievements Needed</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-4 text-center dark:from-orange-950/30 dark:to-red-950/30">
              <TrendingUpIcon className="mx-auto mb-2 h-8 w-8 text-orange-600" />
              <h3 className="font-semibold text-orange-800 dark:text-orange-300">Enhancements</h3>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{totalMetricsToEnhance}</p>
              <p className="text-sm text-orange-600 dark:text-orange-500">Metrics to Improve</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-4 text-center dark:from-green-950/30 dark:to-emerald-950/30">
              <BarChart3Icon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Metrics</h3>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{totalSuggestedMetrics}</p>
              <p className="text-sm text-green-600 dark:text-green-500">Suggested Metrics</p>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4 text-center dark:from-purple-950/30 dark:to-pink-950/30">
              <DatabaseIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Data Points</h3>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{totalDataPoints}</p>
              <p className="text-sm text-purple-600 dark:text-purple-500">To Gather</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additions Needed Section */}
      {impactMetrics?.additions_needed && impactMetrics?.additions_needed?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PlusIcon className="h-5 w-5 text-blue-600" />
              New Achievement Additions Needed ({totalAdditionsNeeded})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {impactMetrics?.additions_needed?.map((addition, index) => (
                <AdditionCard key={index} addition={addition} index={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics Enhancement Section */}
      {impactMetrics?.metrics_to_enhance && impactMetrics?.metrics_to_enhance?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUpIcon className="h-5 w-5 text-orange-600" />
              Existing Metrics Enhancement ({totalMetricsToEnhance})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {impactMetrics?.metrics_to_enhance?.map((metric, index) => (
                <EnhancementCard key={index} metric={metric} index={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Impact Optimization Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ZapIcon className="h-5 w-5 text-amber-600" />
            Impact Metrics Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <PlusIcon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300">Additions</h3>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                {totalAdditionsNeeded} new achievement{totalAdditionsNeeded !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-950/30">
              <TrendingUpIcon className="mx-auto mb-2 h-6 w-6 text-orange-600" />
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300">Enhancements</h3>
              <p className="text-xs text-orange-700 dark:text-orange-400">
                {totalMetricsToEnhance} metric{totalMetricsToEnhance !== 1 ? "s" : ""} to improve
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <BarChart3Icon className="mx-auto mb-2 h-6 w-6 text-green-600" />
              <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">Metrics</h3>
              <p className="text-xs text-green-700 dark:text-green-400">
                {totalSuggestedMetrics} suggested metric{totalSuggestedMetrics !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <DatabaseIcon className="mx-auto mb-2 h-6 w-6 text-purple-600" />
              <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-300">Data</h3>
              <p className="text-xs text-purple-700 dark:text-purple-400">
                {totalDataPoints} data point{totalDataPoints !== 1 ? "s" : ""} needed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* No Data State */}
      {(!impactMetrics?.additions_needed || impactMetrics?.additions_needed?.length === 0) &&
        (!impactMetrics?.metrics_to_enhance || impactMetrics?.metrics_to_enhance?.length === 0) && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <AwardIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  No Impact Metrics Data Available
                </h3>
                <p className="text-muted-foreground">
                  Impact metrics analysis will appear here once data is processed.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default ImpactMetrics;
