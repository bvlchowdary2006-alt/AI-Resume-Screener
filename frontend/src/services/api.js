import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const resumeService = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/upload_resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/resumes');
    return response.data;
  },
};

export const jobService = {
  match: async (jobData) => {
    const response = await api.post('/match_job', jobData);
    return response.data;
  },
};

export const analyticsService = {
  getSummary: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },
  getBiasReport: async (resumeId) => {
    const response = await api.get(`/bias_report/${resumeId}`);
    return response.data;
  },
};

export default api;
