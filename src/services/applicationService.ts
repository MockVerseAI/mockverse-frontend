import { getAuthToken } from "@/lib/utils";
import axios from "axios";

const applicationAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/application`,
  withCredentials: true,
});

applicationAPI.interceptors.request.use(
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

export interface IApplicationCreate {
  companyName: string;
  jobRole: string;
  jobDescription: string;
  resumeId: string;
}

export interface IApplicationReport {
  applicationId: string;
}

const ApplicationService = {
  get: () => {
    return applicationAPI.get("/");
  },
  create: (payload: IApplicationCreate) => {
    return applicationAPI.post("/", payload);
  },
  report: ({ applicationId }: IApplicationReport) => {
    return applicationAPI.get(`/report/${applicationId}`);
  },
};

export default ApplicationService;
