
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../utils/config';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

// Auth endpoints
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (username, email, password) => api.post('/auth/register', { username, email, password });
export const getMe = () => api.get('/auth/me');

// Posts endpoints
export const getPosts = () => api.get('/posts');
export const createPost = (image, caption) => api.post('/posts', { image, caption });
export const likePost = (postId) => api.put(`/posts/${postId}/like`);
export const commentOnPost = (postId, text) => api.post(`/posts/${postId}/comment`, { text });
export const getUserPosts = (userId) => api.get(`/posts/user/${userId}`);

// Users endpoints
export const getUserProfile = (userId) => api.get(`/users/profile/${userId}`);
export const followUser = (userId) => api.put(`/users/follow/${userId}`);
export const searchUsers = (query) => api.get(`/users/search?q=${query}`);
export const getAllUsers = () => api.get('/users/discover');
export const updateProfile = (data) => api.put('/users/profile', data);

export default api;

