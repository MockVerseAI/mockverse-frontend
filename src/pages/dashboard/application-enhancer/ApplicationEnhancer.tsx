import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

const ApplicationEnhancer = () => {
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
    </div>
  );
};

export default ApplicationEnhancer;
