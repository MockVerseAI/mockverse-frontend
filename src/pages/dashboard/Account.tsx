import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import UserService, { IChangeAvatar } from "@/services/userService";
import { AppDispatch, RootState } from "@/store";
import { setUser } from "@/store/user/slice";
import { useMutation } from "@tanstack/react-query";
import { ExternalLink, Plus, SquarePen, Trash2 } from "lucide-react";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "sonner";

const Account = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user, resumes } = useSelector((root: RootState) => root.user);

  // Mutation to handle image upload
  const { mutate: updateAvatar, isPending } = useMutation({
    mutationFn: (payload: IChangeAvatar) => UserService.changeAvatar(payload),
    onSuccess: (response: any) => {
      dispatch(setUser(response.data.data));
      toast.success(response.data.message);
    },
    onError: (error: any) => {
      console.error("Error uploading avatar:", error);
      toast.error("Something went wrong!");
    },
  });

  const handleEditClick = useCallback(() => {
    if (fileInput?.current) fileInput?.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        updateAvatar({ avatar: file });
      }
    },
    [updateAvatar]
  );

  return (
    <div className="flex h-full w-full flex-col items-center">
      <input ref={fileInput} type="file" accept="image/*" hidden onChange={handleFileChange} />
      <Avatar className="relative size-28 overflow-visible rounded-full">
        <AvatarImage src={user?.avatar} alt={user?.username} className="rounded-full" />
        <AvatarFallback className="rounded-full uppercase">{user?.username?.slice(0, 1)}</AvatarFallback>
        <Button
          onClick={handleEditClick}
          size="icon"
          disabled={isPending}
          className="absolute bottom-1 right-1 size-8 cursor-pointer rounded-full"
        >
          <SquarePen className="size-4 text-white" />
        </Button>
      </Avatar>

      <div className="mt-4">
        <div className="flex flex-col items-center">
          <h1 className="text-xl">{user?.username}</h1>
          <span className="text-muted-foreground">{user?.email}</span>
        </div>
      </div>

      <Card className="mt-5 w-full max-w-96">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>Resumes</h1>
            <Button>
              <Plus className="size-4" /> Add
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {resumes.map((item) => (
              <div id={item._id} className="flex items-center justify-between">
                <span>{item.fileName}</span>
                <div className="flex items-center gap-2">
                  <Link
                    to={item.url}
                    target="_black"
                    className={cn(buttonVariants({ variant: "default", size: "icon" }))}
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                  <Button size="icon" className="bg-red-500">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
