import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IInterview } from "@/types";
import { cn } from "@/lib/utils";
import { ArrowRightCircle, Bookmark, Bot, Check, Clock } from "lucide-react";
import moment from "moment";
import { useMemo } from "react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";

const InterviewCard = ({ interview }: { interview: IInterview }) => {
  const isCompleted = interview.isCompleted;

  const url = useMemo(() => {
    if (!interview.isCompleted) {
      if (interview.isAgentMode)
        return `/dashboard/interview-workspace/${interview.interviewWorkspaceId}/interview/agent/${interview._id}`;
      else return `/dashboard/interview-workspace/${interview.interviewWorkspaceId}/interview/chat/${interview._id}`;
    } else {
      return `/dashboard/interview-workspace/${interview.interviewWorkspaceId}/interview/report/${interview._id}`;
    }
  }, [interview]);

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="mb-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            <span className="line-clamp-1 overflow-hidden text-ellipsis">{interview?.interviewTemplateId?.name}</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            {interview.isAgentMode ? (
              <Badge variant="outline" className="py-1">
                <Bot className="h-3 w-3" />
              </Badge>
            ) : null}
            <Badge variant={isCompleted ? "success" : "secondary"} className="ml-2 px-2">
              {isCompleted ? <Check className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
              {isCompleted ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 text-sm">
        <p className="text-muted-foreground line-clamp-2 text-sm">{interview.interviewTemplateId.description}</p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 capitalize">
            <Bookmark className="h-3 w-3" />
            {interview.interviewTemplateId.category}
          </Badge>
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {moment(interview.createdAt).format("MMM D, YYYY")}
          </span>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Link
          to={url}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "sm",
            }),
            "group"
          )}
        >
          {isCompleted ? "View Report" : "Resume Interview"}
          <ArrowRightCircle className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
