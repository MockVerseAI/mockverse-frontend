import apiClient from "@/lib/axios";

export interface IInterviewSetup {
  jobRole: string;
  jobDescription: string;
  resumeId: string;
}

export interface IChat {
  message: string;
  interviewId: string;
  isFirst: boolean;
}

export interface IInterviewEnd {
  interviewId: string;
}

const InterviewService = {
  getAll: () => {
    return apiClient.get("/api/v1/interview");
  },
  setup: (payload: IInterviewSetup) => {
    return apiClient.post("/api/v1/interview/setup", payload);
  },
  chat: ({ interviewId, ...rest }: IChat) => {
    return apiClient.post(`/api/v1/interview/chat/${interviewId}`, rest);
  },
  end: ({ interviewId }: IInterviewEnd) => {
    return apiClient.post(`/api/v1/interview/end/${interviewId}`);
  },
  report: ({ interviewId }: IInterviewEnd) => {
    return apiClient.get(`/api/v1/interview/report/${interviewId}`);
  },
};

export default InterviewService;
