import { Skeleton } from "./ui/skeleton";

const LoadingSkeletons = ({ count }: { count: number }) => {
  return Array(count)
    .fill(0)
    .map((_, idx) => <Skeleton key={idx} className="h-[145px]" />);
};

export default LoadingSkeletons;
