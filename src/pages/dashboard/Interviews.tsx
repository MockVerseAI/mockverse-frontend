import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IInterview } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewService from "@/services/interviewService";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Link } from "react-router";

const Interviews = () => {
  const { data: interviews, isPending } = useQuery({
    queryKey: ["interviews"],
    queryFn: async () => {
      return await InterviewService.get();
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Your Recent Interviews</h1>
        <Link to="/dashboard/interview/setup" className={cn(buttonVariants({ variant: "default" }))}>
          Start new session
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isPending
          ? Array(2)
              .fill(0)
              .map((_, idx) => <Skeleton key={idx} className="h-[145px]" />)
          : null}
        {!isPending
          ? interviews?.data.data.map((item: IInterview) => (
              <Card key={item._id}>
                <CardHeader className="pb-1">
                  <CardTitle>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap">{item.jobRole}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-1 text-sm">{moment(item.createdAt).format("lll")}</CardContent>
                <CardFooter className="mt-3 justify-end">
                  {item.isCompleted ? (
                    <Link
                      to={`/dashboard/interview/report/${item._id}`}
                      className={cn(buttonVariants({ variant: "default" }))}
                    >
                      Report
                    </Link>
                  ) : (
                    <Link
                      to={`/dashboard/interview/chat/${item._id}`}
                      className={cn(buttonVariants({ variant: "default" }))}
                    >
                      Resume Interview
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))
          : null}
      </div>
    </div>
  );
};

export default Interviews;
