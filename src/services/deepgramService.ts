import apiClient from "@/lib/axios";

const DeepgramService = {
  get: (interviewId: string) => {
    return apiClient.get(`/api/v1/deepgram/key/${interviewId}`);
  },
};

export default DeepgramService;
