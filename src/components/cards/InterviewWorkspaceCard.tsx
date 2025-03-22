import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { IInterviewWorkspace } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRightCircle, Building, Clock } from "lucide-react";
import moment from "moment";
import { Link } from "react-router";

const InterviewWorkspaceCard = ({ interviewWorkspace }: { interviewWorkspace: IInterviewWorkspace }) => {
  const createdDate = moment(interviewWorkspace.createdAt);

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardContent>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-start gap-3">
            <div className="bg-primary/10 flex-shrink-0 rounded-md p-2">
              <Building className="text-primary h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <CardTitle className="text-foreground/90 line-clamp-1 text-lg font-semibold">
                {interviewWorkspace?.companyName}
              </CardTitle>

              <p className="text-foreground/80 mt-1 line-clamp-1 text-sm font-medium">{interviewWorkspace?.jobRole}</p>
            </div>
          </div>

          <div className="text-muted-foreground mt-auto flex items-center gap-2 pb-4 text-xs">
            <Clock className="h-3.5 w-3.5" />
            <span>
              Created {createdDate.format("MMM DD, YYYY")} · {createdDate.fromNow()}
            </span>
          </div>

          <Link
            to={`/dashboard/interview-workspace/${interviewWorkspace._id}`}
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "group"
            )}
          >
            View Workspace
            <ArrowRightCircle className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewWorkspaceCard;
