import apiClient from "@/lib/axios";

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
  getAll: () => {
    return apiClient.get("/api/v1/application/");
  },
  create: (payload: IApplicationCreate) => {
    return apiClient.post("/api/v1/application/", payload);
  },
  report: ({ applicationId }: IApplicationReport) => {
    return apiClient.get(`/api/v1/application/report/${applicationId}`);
  },
};

export default ApplicationService;
