import { CalendarX, FileX } from "lucide-react";
import { useMemo } from "react";

interface NoDataFoundProps {
  type: "interview" | "application" | "resume";
  title?: string;
  description?: string;
}

const NoDataFound = ({ type, title, description }: NoDataFoundProps) => {
  const icon = useMemo(() => {
    switch (type) {
      case "interview":
        return <CalendarX className="text-muted-foreground size-6" />;
      case "application":
        return <FileX className="text-muted-foreground size-6" />;
      case "resume":
        return <FileX className="text-muted-foreground size-6" />;
      default:
        return <FileX className="text-muted-foreground size-6" />;
    }
  }, [type]);

  const defaultTitle = useMemo(() => {
    switch (type) {
      case "interview":
        return "No Interviews Found";
      case "application":
        return "No Applications Found";
      case "resume":
        return "No Resumes Found";
      default:
        return "No Data Found";
    }
  }, [type]);

  const defaultDescription = useMemo(() => {
    switch (type) {
      case "interview":
        return "No interviews found. Create a new interview to get started.";
      case "application":
        return "No applications found. Create a new application to get started.";
      case "resume":
        return "No resumes found. Create a new resume to get started.";
      default:
        return "No data found. Create a new data to get started.";
    }
  }, [type]);

  return (
    <div className="border-border bg-card col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border p-8 text-center">
      <div className="bg-muted rounded-full p-3">{icon}</div>
      <div>
        <h3 className="text-card-foreground text-sm font-semibold">{title || defaultTitle}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{description || defaultDescription}</p>
      </div>
    </div>
  );
};

export default NoDataFound;
