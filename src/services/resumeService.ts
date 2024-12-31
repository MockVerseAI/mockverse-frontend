import axios from "axios";

const resumeAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/resume`,
  withCredentials: true,
});

export interface IResume {
  resume: File;
}

const ResumeService = {
  create: (payload: IResume) => {
    return resumeAPI.postForm("/", payload);
  },

  getAll: () => {
    return resumeAPI.get("/");
  },
};

export default ResumeService;
