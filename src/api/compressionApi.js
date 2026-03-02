import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 600000,
  withCredentials: true,
});

export const compressionApi = {
  getFormats: async () => {
    try {
      const response = await apiClient.get('/api/formats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch formats');
    }
  },

 compressFile: async (file, format, level, preserveStructure, onProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', String(format || 'zip')); // Ensure it's a string
    formData.append('level', String(level || '6'));    // Ensure it's a string
    
    const response = await apiClient.post('/api/compress', formData, {
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    return response.data;
  } catch (error) {
    console.error("Frontend API Error:", error);
    throw new Error(error.response?.data?.error || 'Compression failed');
  }
},

  compressFiles: async (files, format, level, onProgress) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file); // Note: Server expects 'files' array
      });
      formData.append('format', format);
      formData.append('level', level);

      const response = await apiClient.post('/api/compress-batch', formData, {
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress(percentCompleted);
          }
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Batch compression failed');
    }
  },

  downloadFile: async (fileId) => {
    try {
      const response = await apiClient.get(`/api/download/${fileId}`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      // Blobs mask the JSON error message, so we just throw a generic one
      throw new Error('Download failed');
    }
  },

  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('Health check failed');
    }
  },
};
