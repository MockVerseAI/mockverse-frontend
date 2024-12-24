import FullScreenLoader from "@/components/FullScreenLoader";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const SSOSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    }
  }, [navigate, searchParams]);

  return <FullScreenLoader />;
};

export default SSOSuccess;
