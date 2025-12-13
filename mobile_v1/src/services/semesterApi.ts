import api from "./api";

export interface Semester {
  id: number;
  term: string;
  academic_year: string;
  start_date: string; // Semester Start
  end_date: string; // Semester End
  registration_open_date: string; // Regular Request Start
  registration_close_date: string; // Regular Request End
  registration_special_open_date: string; // Special Request Start
  registration_special_close_date: string; // Special Request End
  renewal_open_date: string; // Extension Start
  renewal_close_date: string; // Extension End
  is_active: number | boolean;
}

export const getAllSemesters = async (): Promise<Semester[]> => {
  const response = await api.get("/semesters");
  return response.data;
};

export const getSemesterById = async (
  id: string | number
): Promise<Semester> => {
  const response = await api.get(`/semesters/${id}`);
  return response.data;
};

export const createSemester = async (
  data: Partial<Semester>
): Promise<Semester> => {
  const response = await api.post("/semesters", data);
  return response.data;
};

export const updateSemester = async (
  id: string | number,
  data: Partial<Semester>
): Promise<Semester> => {
  const response = await api.put(`/semesters/${id}`, data);
  return response.data;
};

export const deleteSemester = async (id: string | number): Promise<void> => {
  await api.delete(`/semesters/${id}`);
};
