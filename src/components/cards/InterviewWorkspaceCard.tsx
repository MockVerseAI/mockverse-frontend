import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IInterviewWorkspace } from "@/lib/types";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Link } from "react-router";

const InterviewWorkspaceCard = ({ interviewWorkspace }: { interviewWorkspace: IInterviewWorkspace }) => {
  return (
    <Card>
      <CardHeader className="mb-1">
        <CardTitle>
          <span className="line-clamp-1 overflow-hidden text-ellipsis">
            {interviewWorkspace?.companyName} - {interviewWorkspace?.jobRole}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-1 text-sm">{moment(interviewWorkspace.createdAt).format("lll")}</CardContent>
      <CardFooter className="mt-3 justify-end">
        <Link
          to={`/dashboard/interview-workspace/${interviewWorkspace._id}`}
          className={cn(buttonVariants({ variant: "secondary" }))}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InterviewWorkspaceCard;
