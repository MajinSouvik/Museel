import axios from 'axios';
import store from '../redux/store'
import { refreshAccessToken, logout } from '../redux/authSlice';
import {getRefreshToken } from '../services/authService';
import { API } from './constants';

const api = axios.create({
    baseURL: API, 
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.auth.access_token;
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


api.interceptors.response.use(
    (response) => {
        return response;
    },
    
    async (error) => {
        const originalRequest = error.config;
        
        const refreshToken = getRefreshToken(); 

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true; 

            try {
                
                const response = await axios.post(API+'auth/api/token/refresh/', { refresh: refreshToken });
                const newAccessToken = response.data.access;     
                store.dispatch(refreshAccessToken({ tokens: response.data }));
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest)
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;