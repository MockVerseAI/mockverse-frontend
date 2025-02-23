import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ReportSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-64" />

      <div className="container mx-auto py-4">
        <div className="bg-muted relative h-[52px] overflow-x-scroll overflow-y-hidden rounded-sm lg:bg-transparent">
          <div className="absolute flex w-full flex-row justify-stretch">
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} className="mx-1 h-9 flex-1" />
              ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton key={idx} className="h-4 w-full" />
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton key={idx} className="h-4 w-full" />
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton key={idx} className="h-4 w-full" />
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportSkeleton;
