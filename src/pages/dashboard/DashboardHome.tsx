import InterviewCard from "@/components/InterviewCard";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import { IInterview } from "@/lib/types";
import InterviewService from "@/services/interviewService";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { data: interviews, isPending } = useQuery({
    queryKey: ["interviews"],
    queryFn: async () => {
      return await InterviewService.get();
    },
  });

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-2xl lg:text-3xl">Welcome, {user?.username} </h1>
      </div>

      <div className="mt-10 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Your Recent Interviews</h1>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {!isPending ? (
            interviews?.data.data.map((item: IInterview) => <InterviewCard key={item._id} interview={item} />)
          ) : (
            <LoadingSkeletons count={2} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
