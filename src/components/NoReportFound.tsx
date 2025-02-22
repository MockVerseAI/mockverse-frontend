import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileX } from "lucide-react";

const NoReportFound = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="mx-auto max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center">
            <div className="bg-muted rounded-full p-3">
              <FileX className="text-muted-foreground size-6" />
            </div>
          </div>
          <CardTitle className="mt-4">No Data Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            We couldn't find the report you're looking for. This might be due to a temporary issue.
          </p>
          <Button onClick={handleRefresh}>Refresh Page</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoReportFound;
