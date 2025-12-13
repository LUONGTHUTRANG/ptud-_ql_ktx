import api from "./api";

export const fetchBuildings = async () => {
  try {
    const response = await api.get("/buildings");
    return response.data;
  } catch (error) {
    console.error("Error fetching buildings:", error);
    throw error;
  }
};

export const getBuildingById = async (id: string | number) => {
  try {
    const response = await api.get(`/buildings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching building ${id}:`, error);
    throw error;
  }
};
