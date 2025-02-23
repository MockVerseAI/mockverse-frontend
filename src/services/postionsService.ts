import { getAuthToken } from "@/lib/utils";
import axios from "axios";

const positionAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/positions`,
  withCredentials: true,
});

positionAPI.interceptors.request.use(
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

const PositionsService = {
  get: ({ search }: { search: string }) => {
    return positionAPI.get("/", { params: { search } });
  },
};

export default PositionsService;
