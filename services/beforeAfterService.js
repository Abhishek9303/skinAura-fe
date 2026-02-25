import { apiService } from "./api";

export const beforeAfterService = {
  // Public methods
  getAllBeforeAfter: async () => {
    try {
      const response = await apiService.get("api/v1/common/beforeAfter");
      return response;
    } catch (error) {
      console.error("Error fetching Before/After reviews:", error);
      throw error;
    }
  },

  // Admin methods
  getAllBeforeAfterAdmin: async () => {
    try {
      const response = await apiService.get("api/v1/admin/beforeAfter");
      return response;
    } catch (error) {
      console.error("Error fetching Before/After reviews (Admin):", error);
      throw error;
    }
  },

  createBeforeAfter: async (data) => {
    try {
      const response = await apiService.post("api/v1/admin/beforeAfter", data);
      return response;
    } catch (error) {
      console.error("Error creating Before/After review:", error);
      throw error;
    }
  },

  updateBeforeAfter: async (id, data) => {
    try {
      const response = await apiService.put(`api/v1/admin/beforeAfter/${id}`, data);
      return response;
    } catch (error) {
      console.error("Error updating Before/After review:", error);
      throw error;
    }
  },

  deleteBeforeAfter: async (id) => {
    try {
      const response = await apiService.delete(`api/v1/admin/beforeAfter/${id}`);
      return response;
    } catch (error) {
      console.error("Error deleting Before/After review:", error);
      throw error;
    }
  },
};
