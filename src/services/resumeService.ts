import apiClient from "@/lib/axios";

export interface IResumeCreate {
  resume: File;
  name: string;
}

export interface IResumeDelete {
  resumeId: string;
}

export interface IResumeUpdate {
  resumeId: string;
  name: string;
}

const ResumeService = {
  create: (payload: IResumeCreate) => {
    return apiClient.postForm("/api/v1/resume/", payload);
  },
  getAll: () => {
    return apiClient.get("/api/v1/resume/");
  },
  delete: ({ resumeId }: IResumeDelete) => {
    return apiClient.delete(`/api/v1/resume/${resumeId}`);
  },
  update: ({ resumeId, ...rest }: IResumeUpdate) => {
    return apiClient.patch(`/api/v1/resume/${resumeId}`, rest);
  },
};

export default ResumeService;
