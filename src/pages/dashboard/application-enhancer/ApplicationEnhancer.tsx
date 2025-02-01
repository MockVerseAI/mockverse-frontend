import ApplicationCard from "@/components/ApplicationCard";
import LoadingSkeletons from "@/components/LoadingSkeletons";
import { buttonVariants } from "@/components/ui/button";
import { IApplication } from "@/lib/types";
import { cn } from "@/lib/utils";
import ApplicationService from "@/services/applicationService";
import { useQuery } from "@tanstack/react-query";
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

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {!isPending ? (
          applications?.map((item: IApplication) => <ApplicationCard key={item._id} application={item} />)
        ) : (
          <LoadingSkeletons count={2} />
        )}
      </div>
    </div>
  );
};

export default ApplicationEnhancer;
