import { IInterview } from "@/lib/types";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const InterviewCard = ({ interview }: { interview: IInterview }) => {
  return (
    <Card>
      <CardHeader className="mb-1">
        <CardTitle>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {interview?.companyName} - {interview?.jobRole}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-1 text-sm">{moment(interview.createdAt).format("lll")}</CardContent>
      <CardFooter className="mt-3 justify-end">
        {interview.isCompleted ? (
          <Link
            to={`/dashboard/interview/report/${interview._id}`}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Report
          </Link>
        ) : (
          <Link
            to={`/dashboard/interview/chat/${interview._id}`}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Resume Interview
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default InterviewCard;
