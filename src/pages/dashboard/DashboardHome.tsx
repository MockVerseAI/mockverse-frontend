import ApplicationCard from "@/components/cards/ApplicationCard";
import InterviewCard from "@/components/cards/InterviewCard";
import NoDataFound from "@/components/cards/NoDataFound";
import LoadingSkeletons from "@/components/loaders/LoadingSkeletons";
import { buttonVariants } from "@/components/ui/button";
import { IApplication, IInterview } from "@/lib/types";
import { cn } from "@/lib/utils";
import ApplicationService from "@/services/applicationService";
import InterviewService from "@/services/interviewService";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const DashboardHome = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { data: interviews, isPending } = useQuery({
    queryKey: ["interviews"],
    queryFn: async () => {
      const res = await InterviewService.getAll();
      return res?.data?.data || [];
    },
  });

  const { data: applications, isPending: isApplicationsPending } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await ApplicationService.getAll();
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
          <div className="flex items-center gap-2">
            <Link to="/dashboard/interview" className={cn(buttonVariants({ variant: "ghost" }))}>
              View all
            </Link>
            <Link to="/dashboard/interview/setup" className={cn(buttonVariants({ variant: "default" }))}>
              <Plus /> New session
            </Link>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {!isPending ? (
            interviews?.length > 0 ? (
              interviews.slice(0, 3).map((item: IInterview) => <InterviewCard key={item._id} interview={item} />)
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
          <div className="flex items-center gap-2">
            <Link to="/dashboard/application-enhancer" className={cn(buttonVariants({ variant: "ghost" }))}>
              View all
            </Link>
            <Link to="/dashboard/application-enhancer/setup" className={cn(buttonVariants({ variant: "default" }))}>
              <Plus /> New application
            </Link>
          </div>
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
