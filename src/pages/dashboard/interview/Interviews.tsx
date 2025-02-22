import InterviewCard from "@/components/InterviewCard";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import NoDataFound from "@/components/NoDataFound";
import { buttonVariants } from "@/components/ui/button";
import { IInterview } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewService from "@/services/interviewService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const Interviews = () => {
  const { data: interviews, isPending } = useQuery({
    queryKey: ["interviews"],
    queryFn: async () => {
      const res = await InterviewService.get();
      return res.data?.data;
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="title">Your Recent Interviews</h1>
        <Link to="/dashboard/interview/setup" className={cn(buttonVariants({ variant: "default" }))}>
          Start new session
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
