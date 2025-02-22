import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="p-8 text-center">
        <div className="mb-8 flex items-center justify-center gap-2">
          <BrainCircuit className="size-6" />
          <span className="text-xl font-semibold">MockVerse</span>
        </div>

        <h1 className="text-foreground mb-4 text-6xl font-bold">404</h1>
        <h2 className="text-foreground/90 mb-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className={cn(buttonVariants({ variant: "default" }))}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
