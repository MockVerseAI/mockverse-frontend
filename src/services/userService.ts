import axios from "axios";

const userAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/user`,
  withCredentials: true,
});

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
};

export default UserService;
