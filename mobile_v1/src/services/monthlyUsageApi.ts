import api from "./api";

export const monthlyUsageApi = {
  getUsageStatus: async (month: number, year: number, buildingId?: string) => {
    const response = await api.get("/monthly-usages", {
      params: { month, year, buildingId },
    });
    return response.data;
  },

  getServicePrices: async () => {
    const response = await api.get("/monthly-usages/prices");
    return response.data;
  },

  recordUsage: async (data: {
    roomId: number;
    month: number;
    year: number;
    electricityIndex: number;
    waterIndex: number;
  }) => {
    const response = await api.post("/monthly-usages", data);
    return response.data;
  },
};
