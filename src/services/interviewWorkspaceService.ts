import apiClient from "@/lib/axios";

export interface IInterviewWorkspaceCreate {
  companyName: string;
  jobRole: string;
  jobDescription: string;
}

const InterviewWorkspaceService = {
  getAll: () => {
    return apiClient.get("/api/v1/interview-workspace");
  },
  create: (payload: IInterviewWorkspaceCreate) => {
    return apiClient.post("/api/v1/interview-workspace", payload);
  },
  delete: (interviewWorkspaceId: string) => {
    return apiClient.delete(`/api/v1/interview-workspace/${interviewWorkspaceId}`);
  },
};

export default InterviewWorkspaceService;
