import api from "./api";

export const managerApi = {
  getDashboardStats: async () => {
    const response = await api.get("/managers/dashboard/stats");
    return response.data;
  },
};
