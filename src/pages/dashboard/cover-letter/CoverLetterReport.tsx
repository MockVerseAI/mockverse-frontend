import NoReportFound from "@/components/cards/NoReportFound";
import ReportSkeleton from "@/components/loaders/ReportSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CoverLetterService from "@/services/coverLetterService";
import { ICoverLetter } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  AwardIcon,
  BriefcaseIcon,
  BuildingIcon,
  ClockIcon,
  FileTextIcon,
  TypeIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";
import { useParams } from "react-router";
import { useState } from "react";

const CoverLetterReport = () => {
  const { id: coverLetterId = "" } = useParams();
  const [isCopied, setIsCopied] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: [`cover-letter-report-${coverLetterId}`],
    queryFn: async () => {
      const res = await CoverLetterService.getCoverLetter(coverLetterId);
      return res?.data?.data as ICoverLetter;
    },
  });

  if (isPending) {
    return <ReportSkeleton />;
  }

  if (!data) {
    return <NoReportFound />;
  }

  const formatDuration = (ms: number | null) => {
    if (!ms) return "N/A";
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data.generatedContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="container mx-auto space-y-6 py-6 pt-0">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FileTextIcon className="h-6 w-6 text-blue-600" />
            Cover Letter Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-950/30">
              <BuildingIcon className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <h3 className="font-semibold text-blue-800 dark:text-blue-300">Company</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">{data.companyName}</p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-950/30">
              <BriefcaseIcon className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-300">Role</h3>
              <p className="text-sm text-green-700 dark:text-green-400">{data.jobRole}</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-950/30">
              <TypeIcon className="mx-auto mb-2 h-8 w-8 text-purple-600" />
              <h3 className="font-semibold text-purple-800 dark:text-purple-300">Word Count</h3>
              <p className="text-sm text-purple-700 dark:text-purple-400">{data.wordCount} words</p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4 text-center dark:bg-amber-950/30">
              <ClockIcon className="mx-auto mb-2 h-8 w-8 text-amber-600" />
              <h3 className="font-semibold text-amber-800 dark:text-amber-300">Generated In</h3>
              <p className="text-sm text-amber-700 dark:text-amber-400">{formatDuration(data.generationDuration)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Cover Letter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AwardIcon className="h-5 w-5 text-blue-600" />
              Cover Letter
            </CardTitle>
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              size="sm"
              className={`transition-all duration-200 ${
                isCopied
                  ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-50 dark:border-green-700 dark:bg-green-950/30 dark:text-green-400"
                  : "hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:border-blue-700 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
              }`}
            >
              {isCopied ? (
                <>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="mr-2 h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 dark:from-blue-950/30 dark:to-indigo-950/30">
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <div className="text-sm leading-relaxed whitespace-pre-wrap text-blue-900 dark:text-blue-100">
                {data.generatedContent}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverLetterReport;
