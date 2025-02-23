import { IApplication } from "@/lib/types";
import moment from "moment";
import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ApplicationCard = ({ application }: { application: IApplication }) => {
  return (
    <Card>
      <CardHeader className="mb-1">
        <CardTitle>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {application.companyName} - {application.jobRole}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-1 text-sm">{moment(application.createdAt).format("lll")}</CardContent>
      <CardFooter className="mt-3 justify-end">
        <Link
          to={`/dashboard/application-enhancer/report/${application._id}`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Feedback
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
