import CoverLetterCard from "@/components/cards/CoverLetterCard";
import NoDataFound from "@/components/cards/NoDataFound";
import LoadingSkeletons from "@/components/loaders/LoadingSkeletons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CoverLetterService from "@/services/coverLetterService";
import { ICoverLetter } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const CoverLetter = () => {
  const { data: coverLetters, isPending } = useQuery({
    queryKey: ["cover-letters"],
    queryFn: async () => {
      const res = await CoverLetterService.getAll();
      return res?.data?.data?.data;
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="title">Generate Cover Letters with AI</h1>
          <p className="text-muted-foreground text-sm">
            Get customized cover letters for your job applications effortlessly.
          </p>
        </div>
        <Link to="/dashboard/cover-letter/setup" className={cn(buttonVariants({ variant: "default" }))}>
          Get Started
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && <LoadingSkeletons count={2} />}
        {!isPending && coverLetters?.length === 0 && <NoDataFound type="cover-letter" />}
        {!isPending &&
          coverLetters?.map((coverLetter: ICoverLetter) => (
            <CoverLetterCard key={coverLetter._id} coverLetter={coverLetter} />
          ))}
      </div>
    </div>
  );
};

export default CoverLetter;
