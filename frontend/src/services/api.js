import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const resumeService = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post("/resumes/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
  getAll: async () => {
    const { data } = await api.get("/resumes");
    return data;
  },
};

export const jobService = {
  match: async (jobData) => {
    const { data } = await api.post("/jobs/match", jobData);
    return data;
  },
  getAll: async () => {
    const { data } = await api.get("/jobs");
    return data;
  },
};

export const analyticsService = {
  getSummary: async () => {
    const { data } = await api.get("/analytics/summary");
    return data;
  },
  getBiasReport: async (resumeId) => {
    const { data } = await api.get(`/analytics/bias/${resumeId}`);
    return data;
  },
  getHealth: async () => {
    const { data } = await api.get("/health");
    return data;
  },
};
