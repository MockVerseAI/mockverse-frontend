import apiClient from "@/lib/axios";

export interface ICoverLetterCreate {
  companyName: string;
  jobRole: string;
  jobDescription: string;
  resumeId: string;
}

export interface ICoverLetterReport {
  coverLetterId: string;
}

const CoverLetterService = {
  getAll: () => {
    return apiClient.get("/api/v1/cover-letter");
  },
  create: (payload: ICoverLetterCreate) => {
    return apiClient.post("/api/v1/cover-letter", payload);
  },
  getCoverLetter: (coverLetterId: string) => {
    return apiClient.get(`/api/v1/cover-letter/${coverLetterId}`);
  },
};

export default CoverLetterService;
