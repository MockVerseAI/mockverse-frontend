import AuthScreenWrapper from "@/components/AuthScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserService from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  newPassword: z.string().min(1),
});

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (payload: z.infer<typeof formSchema>) => UserService.resetPassword(payload, token || ""),
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message);
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate("/login");
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    forgotPassword(values);
  };

  return (
    <AuthScreenWrapper>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" {...register("newPassword")} required />
                </div>
                <Button disabled={isPending} isLoading={isPending} type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthScreenWrapper>
  );
};

export default ResetPassword;
