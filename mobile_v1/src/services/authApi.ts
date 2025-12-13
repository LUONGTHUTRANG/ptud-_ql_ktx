import api from "./api";

export const getMe = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
