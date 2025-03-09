import apiClient from "@/lib/axios";

export interface IResume {
  resume: File;
}

const ResumeService = {
  create: (payload: IResume) => {
    return apiClient.postForm("/api/v1/resume/", payload);
  },
  getAll: () => {
    return apiClient.get("/api/v1/resume/");
  },
  delete: (id: string) => {
    return apiClient.delete(`/api/v1/resume/${id}`);
  },
};

export default ResumeService;
