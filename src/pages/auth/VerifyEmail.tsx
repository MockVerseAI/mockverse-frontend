import AuthScreenWrapper from "@/components/AuthScreenWrapper";
import { Card, CardContent } from "@/components/ui/card";
import UserService from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig, LoaderCircle, MailWarning } from "lucide-react";
import { Link, useParams } from "react-router";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  const { isPending, data, error } = useQuery({
    queryKey: ["user/verify-email", verificationToken],
    queryFn: () => UserService.verifyEmail(verificationToken || ""),
  });

  return (
    <AuthScreenWrapper>
      <Card>
        <CardContent>
          <div className="mt-4 flex flex-col items-center gap-2">
            {isPending ? (
              <>
                <LoaderCircle className="size-10 animate-spin" />
                <div className="text-center">Verifying your email. Please wait</div>
              </>
            ) : null}
            {data ? (
              <>
                <CircleCheckBig className="size-10" />
                <div className="text-center">
                  Your Email has been verified successfully. <br /> Please{" "}
                  <Link to="/login" className="hover:underline">
                    login
                  </Link>
                </div>
              </>
            ) : null}
            {error ? (
              <>
                <MailWarning className="size-10" />
                {/* @ts-expect-error  error type is not defined*/}
                <div className="text-center">{error?.response?.data?.message}</div>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </AuthScreenWrapper>
  );
};

export default VerifyEmail;
