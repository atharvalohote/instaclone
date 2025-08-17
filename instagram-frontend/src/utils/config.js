// Configuration for different environments
const DEV_API_URL = 'http://localhost:5002/api';
const DEV_SOCKET_URL = 'http://localhost:5002';

// For APK build, use a temporary cloud solution
// You can replace this with your actual Render deployment URL
const PROD_API_URL = 'https://your-backend-url.onrender.com/api';
const PROD_SOCKET_URL = 'https://your-backend-url.onrender.com';

// Use development URLs for Expo Go, production URLs for APK
export const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;
export const SOCKET_URL = __DEV__ ? DEV_SOCKET_URL : PROD_SOCKET_URL;
