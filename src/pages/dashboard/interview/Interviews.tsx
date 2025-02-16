import InterviewCard from "@/components/InterviewCard";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import { buttonVariants } from "@/components/ui/button";
import { IInterview } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewService from "@/services/interviewService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { CalendarX } from "lucide-react";

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
            <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-8 text-center">
              <div className="rounded-full bg-gray-100 p-3">
                <CalendarX className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">No interviews found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating your first interview.</p>
              </div>
            </div>
          )
        ) : (
          <LoadingSkeletons count={2} />
        )}
      </div>
    </div>
  );
};

export default Interviews;
