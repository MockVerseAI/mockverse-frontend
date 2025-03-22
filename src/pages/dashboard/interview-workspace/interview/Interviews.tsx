import InterviewCard from "@/components/cards/InterviewCard";
import NoDataFound from "@/components/cards/NoDataFound";
import LoadingSkeletons from "@/components/loaders/LoadingSkeletons";
import { buttonVariants } from "@/components/ui/button";
import { IInterview } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewService from "@/services/interviewService";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

const Interviews = () => {
  const { id: interviewWorkspaceId = "" } = useParams();

  const { data: interviews, isPending } = useQuery({
    queryKey: ["interviews", interviewWorkspaceId],
    queryFn: async () => {
      const res = await InterviewService.getAll(interviewWorkspaceId);
      return res.data?.data;
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="title">Your Recent Interview Sessions</h1>
        <Link
          to={`/dashboard/interview-workspace/${interviewWorkspaceId}/interview/setup`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Start new session
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        {!isPending ? (
          interviews?.length > 0 ? (
            interviews.map((item: IInterview) => <InterviewCard key={item._id} interview={item} />)
          ) : (
            <NoDataFound type="interview" />
          )
        ) : (
          <LoadingSkeletons count={2} />
        )}
      </div>
    </div>
  );
};

export default Interviews;
