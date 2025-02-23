import ApplicationCard from "@/components/cards/ApplicationCard";
import InterviewCard from "@/components/cards/InterviewCard";
import NoDataFound from "@/components/cards/NoDataFound";
import LoadingSkeletons from "@/components/loaders/LoadingSkeletons";
import { IApplication, IInterview } from "@/lib/types";
import ApplicationService from "@/services/applicationService";
import InterviewService from "@/services/interviewService";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { data: interviews, isPending } = useQuery({
    queryKey: ["interviews"],
    queryFn: async () => {
      const res = await InterviewService.get();
      return res?.data?.data || [];
    },
  });

  const { data: applications, isPending: isApplicationsPending } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await ApplicationService.get();
      return res?.data?.data || [];
    },
  });
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="font-heading text-2xl font-medium lg:text-3xl">Welcome, {user?.username}</h1>
      </div>

      <div className="mt-10 w-full">
        <div className="flex items-center justify-between">
          <h1 className="title">Your Recent Interviews</h1>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <div className="mt-10 w-full">
        <div className="flex items-center justify-between">
          <h1 className="title">Your Recent Applications</h1>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {!isApplicationsPending ? (
            applications?.length > 0 ? (
              applications.map((item: IApplication) => <ApplicationCard key={item._id} application={item} />)
            ) : (
              <NoDataFound type="application" />
            )
          ) : (
            <LoadingSkeletons count={2} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
