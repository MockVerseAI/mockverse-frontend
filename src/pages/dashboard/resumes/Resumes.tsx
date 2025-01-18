import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

const Resumes = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl">Perfect Your Resume</h1>
          <p className="text-muted-foreground">Get personalized feedback to align your resume with your dream job.</p>
        </div>
        <Link to="/dashboard/resumes/setup" className={cn(buttonVariants({ variant: "default" }))}>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Resumes;
