import apiClient from "@/lib/axios";

const InterviewTemplateService = {
  get: (payload: any) => {
    return apiClient.get("/api/v1/interview-template/", payload);
  },
  getRelevantTemplate: (interviewWorkspaceId: string) => {
    return apiClient.get(`/api/v1/interview-template/relevant/${interviewWorkspaceId}?limit=1`);
  },
};

export default InterviewTemplateService;
