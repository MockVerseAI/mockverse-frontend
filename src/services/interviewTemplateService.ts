import apiClient from "@/lib/axios";

const InterviewTemplateService = {
  get: (payload: any) => {
    return apiClient.get("/api/v1/interview-template/", payload);
  },
};

export default InterviewTemplateService;
