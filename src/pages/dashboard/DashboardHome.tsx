import ApplicationCard from "@/components/ApplicationCard";
import InterviewCard from "@/components/InterviewCard";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import { IApplication, IInterview } from "@/lib/types";
import ApplicationService from "@/services/applicationService";
import InterviewService from "@/services/interviewService";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { CalendarX } from "lucide-react";
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
        <h1 className="text-2xl lg:text-3xl">Welcome, {user?.username} </h1>
      </div>

      <div className="mt-10 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Your Recent Interviews</h1>
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

      <div className="mt-10 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Your Recent Applications</h1>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {!isApplicationsPending ? (
            applications?.length > 0 ? (
              applications.map((item: IApplication) => <ApplicationCard key={item._id} application={item} />)
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-8 text-center">
                <div className="rounded-full bg-gray-100 p-3">
                  <CalendarX className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">No applications found</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating your first application.</p>
                </div>
              </div>
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
