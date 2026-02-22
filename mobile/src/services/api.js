import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, logout
      await AsyncStorage.removeItem('auth_token');
      // Could dispatch logout action here
    }
    return Promise.reject(error);
  }
);

export const AuthAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      await AsyncStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  register: async (email, password, name) => {
    const response = await api.post('/auth/register', { email, password, name });
    if (response.data.token) {
      await AsyncStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export const MusicAPI = {
  curate: async (preferences) => {
    const response = await api.post('/curate', preferences);
    return response.data;
  },

  generate: async (preferences) => {
    const response = await api.post('/generate', preferences);
    return response.data;
  },

  getJobStatus: async (jobId) => {
    const response = await api.get(`/job/${jobId}`);
    return response.data;
  },

  getBinauralBeat: async (frequency, duration = 300) => {
    const response = await api.get(`/binaural/${frequency}?duration=${duration}`);
    return response.data;
  },
};

export const LibraryAPI = {
  getTracks: async () => {
    const response = await api.get('/library');
    return response.data;
  },

  addTrack: async (trackData) => {
    const response = await api.post('/library', trackData);
    return response.data;
  },

  deleteTrack: async (trackId) => {
    const response = await api.delete(`/library/${trackId}`);
    return response.data;
  },

  toggleFavorite: async (trackId) => {
    const response = await api.post(`/library/${trackId}/favorite`);
    return response.data;
  },
};

export default api;
