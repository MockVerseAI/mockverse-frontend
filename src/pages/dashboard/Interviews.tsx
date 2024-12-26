import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

const Interviews = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Your Recent Interviews</h1>
        <Link to="/dashboard/interview/setup" className={cn(buttonVariants({ variant: "default" }))}>
          Start new session
        </Link>
      </div>
    </div>
  );
};

export default Interviews;
