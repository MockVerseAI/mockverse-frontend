import apiClient from "@/lib/axios";

export interface IInterviewCreate {
  duration: number;
  difficulty: string;
  resumeId: string;
  interviewTemplateId: string;
  isAgentMode: boolean;
}

export interface IChat {
  message: string;
  interviewId: string;
  isFirst: boolean;
}

export interface IInterviewEnd {
  interviewId: string;
}

export interface IInterviewAgentEnd {
  interviewId: string;
  messages: {
    role: string;
    content: string;
  }[];
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
  agent: ({ interviewId }: IInterviewEnd) => {
    return apiClient.get(`/api/v1/interview/agent/${interviewId}`);
  },
  endAgent: ({ interviewId, messages }: IInterviewAgentEnd) => {
    return apiClient.post(`/api/v1/interview/end-agent/${interviewId}`, { messages });
  },
};

export default InterviewService;
