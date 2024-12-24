import AuthScreenWrapper from "@/components/AuthScreenWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserService from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(1).max(50),
});

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signup, isPending } = useMutation({
    mutationFn: (payload: z.infer<typeof formSchema>) => UserService.register(payload),
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message);
    },
    onSuccess: (res: any) => {
      const { data } = res;
      const userId = data?.data?.user?._id;
      navigate(`/email-sent?userId=${userId}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    signup(values);
  };

  return (
    <AuthScreenWrapper>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome aboard</CardTitle>
            <CardDescription>Create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid gap-6">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" placeholder="Enter username" {...register("username")} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" {...register("email")} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...register("password")} required />
                  </div>
                  <Button type="submit" className="w-full" isLoading={isPending}>
                    Sign up
                  </Button>
                </form>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </AuthScreenWrapper>
  );
};

export default Login;
