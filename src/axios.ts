import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor', config);
    return config;
  },
  (error) => {
    console.error('Request Error', error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor', response);
    return response;
  },
  (error) => {
    console.error('Response Error', error);
    return Promise.reject(error);
  }
);

export default instance;
