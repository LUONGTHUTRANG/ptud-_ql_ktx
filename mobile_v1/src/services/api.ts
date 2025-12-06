import axios from "axios";

// Change this to your computer's IP address if running on a physical device
// For Android Emulator, use 'http://10.0.2.2:5000/api'
// For iOS Simulator, use 'http://localhost:5000/api'
// Your current LAN IP seems to be 192.168.1.67
const API_URL = "http://192.168.1.67:5000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchBuildings = async () => {
  try {
    const response = await api.get("/buildings");
    return response.data;
  } catch (error) {
    console.error("Error fetching buildings:", error);
    throw error;
  }
};

export const fetchRooms = async () => {
  try {
    const response = await api.get("/rooms");
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export default api;
