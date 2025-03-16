import InterviewWorkspaceCard from "@/components/cards/InterviewWorkspaceCard";
import NoDataFound from "@/components/cards/NoDataFound";
import LoadingSkeletons from "@/components/loaders/LoadingSkeletons";
import { buttonVariants } from "@/components/ui/button";
import { IInterviewWorkspace } from "@/lib/types";
import { cn } from "@/lib/utils";
import InterviewWorkspaceService from "@/services/interviewWorkspaceService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const InterviewWorkspaces = () => {
  const { data: interviewWorkspaces, isPending } = useQuery({
    queryKey: ["interviewWorkspaces"],
    queryFn: async () => {
      const res = await InterviewWorkspaceService.getAll();
      return res.data?.data;
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="title">Your Interview Workspaces</h1>
          <p className="text-muted-foreground text-sm">Create a workspace to start a new interview session.</p>
        </div>
        <Link to="/dashboard/interview-workspace/setup" className={cn(buttonVariants({ variant: "default" }))}>
          Create Workspace
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {!isPending ? (
          interviewWorkspaces?.length > 0 ? (
            interviewWorkspaces.map((item: IInterviewWorkspace) => (
              <InterviewWorkspaceCard key={item._id} interviewWorkspace={item} />
            ))
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

export default InterviewWorkspaces;
