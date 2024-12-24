import AuthScreenWrapper from "@/components/AuthScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserService from "@/services/userService";
import { useMutation } from "@tanstack/react-query";
import { CircleCheckBig } from "lucide-react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

const EmailSent = () => {
  const [searchParams] = useSearchParams();
  const { mutate: resendEmail, isPending } = useMutation({
    mutationFn: (userId: string) => UserService.resendVerificationEmail(userId),
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message);
    },
    onSuccess: (res: any) => {
      const { data } = res;
      toast.success(data.message);
    },
  });

  return (
    <AuthScreenWrapper>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            <div className="flex flex-col items-center gap-2">
              <CircleCheckBig className="size-10" />
              Verification Email Sent
            </div>
          </CardTitle>
          <CardDescription>Please check your email for the verification link</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            isLoading={isPending}
            onClick={() => resendEmail(searchParams.get("userId") || "")}
            className="w-full"
          >
            Resend Verification Email
          </Button>
        </CardContent>
      </Card>
    </AuthScreenWrapper>
  );
};

export default EmailSent;
