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

const InterviewService = {
  setup: (payload: IInterviewSetup) => {
    return interviewAPI.postForm("/setup", payload);
  },
};

export default InterviewService;
