import apiClient from "@/lib/axios";

const PositionsService = {
  get: () => {
    return apiClient.get("/api/v1/positions/");
  },
};

export default PositionsService;
