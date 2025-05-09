import { BACKENDURL } from '../constants';

import axios, {
    type InternalAxiosRequestConfig,
    type AxiosResponse,
    type AxiosError,
} from 'axios';

const api = axios.create({
    baseURL: BACKENDURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const role = localStorage.getItem('role');
        const verifyToken = localStorage.getItem('verifyToken');

        if (config.headers) {
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            if (refreshToken) {
                config.headers['x-refresh-token'] = refreshToken;
            }
            if (role) {
                config.headers['x-user-role'] = role;
            }
            if (verifyToken) {
                config.headers['x-verify-token'] = verifyToken;
            }
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError) => {
        if (error.response?.data) {
            const { message } = error.response.data as { message: string };
            console.error(message);
        } else {
            console.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
