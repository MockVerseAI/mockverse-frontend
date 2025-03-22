import { IApplication } from "@/lib/types";
import moment from "moment";
import { Link } from "react-router";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRightCircle, Briefcase, Building, Clock } from "lucide-react";

const ApplicationCard = ({ application }: { application: IApplication }) => {
  const createdDate = moment(application.createdAt);

  return (
    <Card className="h-full transition-all duration-300 hover:shadow-md">
      <CardContent>
        <div className="flex h-full flex-col">
          {/* Company and role info */}
          <div className="mb-4 flex items-start gap-3">
            <div className="bg-primary/10 flex-shrink-0 rounded-md p-2">
              <Building className="text-primary h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <CardTitle className="text-foreground/90 line-clamp-1 text-lg font-semibold">
                {application.companyName}
              </CardTitle>

              <div className="mt-1 flex items-center gap-1">
                <Briefcase className="text-muted-foreground h-3.5 w-3.5" />
                <p className="text-foreground/80 line-clamp-1 text-sm font-medium">{application.jobRole}</p>
              </div>
            </div>
          </div>

          {/* Date info */}
          <div className="text-muted-foreground mt-auto flex items-center gap-2 pb-4 text-xs">
            <Clock className="h-3.5 w-3.5" />
            <span>
              Created {createdDate.format("MMM DD, YYYY")} · {createdDate.fromNow()}
            </span>
          </div>

          {/* Action button */}
          <Link
            to={`/dashboard/application-enhancer/report/${application._id}`}
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "group"
            )}
          >
            View Feedback
            <ArrowRightCircle className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
