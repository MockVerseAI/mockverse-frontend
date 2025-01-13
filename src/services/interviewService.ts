import axios from "axios";

const interviewAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/interview`,
  withCredentials: true,
});

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
  get: () => {
    return interviewAPI.get("/");
  },
  setup: (payload: IInterviewSetup) => {
    return interviewAPI.post("/setup", payload);
  },
  chat: ({ interviewId, ...rest }: IChat) => {
    return interviewAPI.post(`/chat/${interviewId}`, rest);
  },
  end: ({ interviewId }: IInterviewEnd) => {
    return interviewAPI.post(`/end/${interviewId}`);
  },
  report: ({ interviewId }: IInterviewEnd) => {
    return interviewAPI.get(`/report/${interviewId}`);
  },
};

export default InterviewService;
