import apiClient from "@/lib/axios";

const PositionsService = {
  get: ({ search }: { search: string }) => {
    return apiClient.get("/api/v1/positions/", { params: { search } });
  },
};

export default PositionsService;
