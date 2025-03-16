import apiClient from "@/lib/axios";

export interface IInterviewCreate {
  duration: number;
  difficulty: string;
  resumeId: string;
  interviewTemplateId: string;
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
  getAll: (interviewWorkspaceId: string) => {
    return apiClient.get(`/api/v1/interview/${interviewWorkspaceId}`);
  },
  setup: (interviewWorkspaceId: string, payload: IInterviewCreate) => {
    return apiClient.post(`/api/v1/interview/${interviewWorkspaceId}/setup`, payload);
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
