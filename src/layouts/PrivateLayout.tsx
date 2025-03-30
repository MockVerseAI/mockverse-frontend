import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import { isUserAuthenticated } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { getAllResumes, getUser } from "@/store/user/actions";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const PrivateLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((root: RootState) => root.user);
  const isAuthenticated = isUserAuthenticated();
  const navigate = useNavigate();
  const [isLoadingGetMyProfile, setIsLoadingGetMyProfile] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoadingGetMyProfile(true);
    if (isAuthenticated) {
      try {
        await Promise.all([dispatch(getUser()), dispatch(getAllResumes())]);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }
    setIsLoadingGetMyProfile(false);
  }, [dispatch, isAuthenticated, navigate]);

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [fetchProfile, user]);

  if (isAuthenticated) {
    if (isLoadingGetMyProfile) {
      return <FullScreenLoader />;
    }
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};

export default PrivateLayout;
