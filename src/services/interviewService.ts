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

const InterviewService = {
  setup: (payload: IInterviewSetup) => {
    return interviewAPI.post("/setup", payload);
  },
  chat: (payload: IChat) => {
    return interviewAPI.post("/chat", payload);
  },
};

export default InterviewService;
