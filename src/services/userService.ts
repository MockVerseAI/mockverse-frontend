import { getAuthToken } from "@/lib/utils";
import axios from "axios";

const userAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/user`,
  withCredentials: true,
});

userAPI.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();
    if (authToken) {
      config.headers.Authorization = authToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {
  username: string;
}

interface IForgotPassword {
  email: string;
}

export interface IChangeAvatar {
  avatar: File;
}

const UserService = {
  login: (payload: ILogin) => {
    return userAPI.post("/login", payload);
  },

  googleLogin: () => {
    return userAPI.get("/google");
  },

  githubLogin: () => {
    return userAPI.get("/github");
  },

  register: (payload: IRegister) => {
    return userAPI.post("/register", payload);
  },

  forgotPassword: (payload: IForgotPassword) => {
    return userAPI.post("/forgot-password", payload);
  },

  resendVerificationEmail: (userId: string) => {
    return userAPI.post(`/resend-email-verification/${userId}`);
  },

  verifyEmail: (verificationToken: string) => {
    return userAPI.get(`/verify-email/${verificationToken}`);
  },

  currentUser: () => {
    return userAPI.get("/current-user");
  },

  logout: () => {
    return userAPI.post("/logout");
  },

  changeAvatar: (payload: IChangeAvatar) => {
    return userAPI.postForm("/avatar", payload);
  },
};

export default UserService;
