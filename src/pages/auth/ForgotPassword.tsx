import AuthScreenWrapper from "@/components/AuthScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UserService from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: forgotPassword, isPending } = useMutation({
    mutationFn: (payload: z.infer<typeof formSchema>) => UserService.forgotPassword(payload),
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message);
    },
    onSuccess: () => {
      setIsEmailSent(true);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    forgotPassword(values);
  };

  return (
    <AuthScreenWrapper>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>{isEmailSent ? "Check your email" : "Enter your email to reset password"}</CardDescription>
        </CardHeader>
        <CardContent>
          {isEmailSent ? (
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                We have sent password reset instructions to your email address. Please check your inbox and follow the
                instructions to reset your password.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" {...register("email")} required />
                </div>
                <Button disabled={isPending} isLoading={isPending} type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </AuthScreenWrapper>
  );
};

export default ForgotPassword;
