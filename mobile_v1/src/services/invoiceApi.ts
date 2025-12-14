import api from "./api";

export const fetchInvoices = async (studentId?: string) => {
  try {
    const url = studentId ? `/invoices?student_id=${studentId}` : "/invoices";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const getInvoiceDetail = async (id: string) => {
  try {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invoice detail:", error);
    throw error;
  }
};
