import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserService, { IChangeAvatar } from "@/services/userService";
import { AppDispatch, RootState } from "@/store";
import { setUser } from "@/store/user/slice";
import { useMutation } from "@tanstack/react-query";
import { SquarePen } from "lucide-react";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Account = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((root: RootState) => root.user);

  // Mutation to handle image upload
  const { mutate: updateAvatar, isPending } = useMutation({
    mutationFn: (payload: IChangeAvatar) => UserService.changeAvatar(payload),
    onSuccess: (response: any) => {
      console.log("Avatar updated successfully:", response.data);
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
        <AvatarImage src={user?.avatar?.url} alt={user?.username} className="rounded-full" />
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
      {user?.avatar?.url}
    </div>
  );
};

export default Account;
