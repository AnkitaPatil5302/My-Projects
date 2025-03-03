import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000", // JSON Server base URL
});


/**
 * CRUD Operations for test Reports
 */
export const testReportServices = {
  // Fetch all test Reports
  fetchAll: async () => {
    try {
      const response = await api.get("/test_reports");
      return response.data;
    } catch (error) {
      console.error("Error fetching test Reports:", error);
      throw error;
    }
  },

  // Fetch test Reports by ID
  fetchById: async (id) => {
    try {
      const response = await api.get(`/test_reports/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching test Reports by ID:", error);
      throw error;
    }
  },

  // Add new test Reports
  add: async (clinicalNoteData) => {
    try {
      const response = await api.post("/test_reports", clinicalNoteData);
      return response.data;
    } catch (error) {
      console.error("Error adding test Reports:", error);
      throw error;
    }
  },

  // Update test Reports (full update)
  update: async (id, updatedData) => {
    try {
      const response = await api.put(`/test_reports/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating test Reports:", error);
      throw error;
    }
  },

  // Update test Reports (partial update)
  patch: async (id, partialData) => {
    try {
      const response = await api.patch(`/test_reports/${id}`, partialData);
      return response.data;
    } catch (error) {
      console.error("Error patching test Reports:", error);
      throw error;
    }
  },

  // Delete test Reports
  delete: async (id) => {
    try {
      await api.delete(`/test_reports/${id}`);
      return `test Reports with ID ${id} deleted.`;
    } catch (error) {
      console.error("Error deleting test Reports:", error);
      throw error;
    }
  },
};