import apiClient from "@/lib/axios";

export interface IInterviewCreate {
  applicationId: string;
}

export interface IInterviewStart {
  interviewId: string;
}

export interface IInterviewAnswer {
  interviewId: string;
  questionId: string;
  answer: string;
}

const InterviewService = {
  create: (payload: IInterviewCreate) => {
    return apiClient.post("/api/v1/interview/", payload);
  },
  getAll: () => {
    return apiClient.get("/api/v1/interview");
  },
  start: ({ interviewId }: IInterviewStart) => {
    return apiClient.post(`/api/v1/interview/start/${interviewId}`);
  },
  answer: (payload: IInterviewAnswer) => {
    return apiClient.post("/api/v1/interview/answer", payload);
  },
  get: (interviewId: string) => {
    return apiClient.get(`/api/v1/interview/${interviewId}`);
  },
};

export default InterviewService;
