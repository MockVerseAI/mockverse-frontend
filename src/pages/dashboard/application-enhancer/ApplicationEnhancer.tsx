import ApplicationCard from "@/components/ApplicationCard";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import { buttonVariants } from "@/components/ui/button";
import { IApplication } from "@/lib/types";
import { cn } from "@/lib/utils";
import ApplicationService from "@/services/applicationService";
import { useQuery } from "@tanstack/react-query";
import { CalendarX } from "lucide-react";
import { Link } from "react-router";

const ApplicationEnhancer = () => {
  const { data: applications, isPending } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await ApplicationService.get();
      return res?.data?.data;
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl">Refine Your Application with AI</h1>
          <p className="text-sm text-muted-foreground">
            Get customized feedback and generate job-specific resumes and cover letters effortlessly.
          </p>
        </div>
        <Link to="/dashboard/application-enhancer/setup" className={cn(buttonVariants({ variant: "default" }))}>
          Get Started
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && <LoadingSkeletons count={2} />}
        {!isPending && applications?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border border-gray-200 bg-white p-8 text-center">
            <div className="rounded-full bg-gray-100 p-3">
              <CalendarX className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">No applications found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first application.</p>
            </div>
          </div>
        )}
        {!isPending &&
          applications?.map((application: IApplication) => (
            <ApplicationCard key={application._id} application={application} />
          ))}
      </div>
    </div>
  );
};

export default ApplicationEnhancer;
