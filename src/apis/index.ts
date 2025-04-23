import axios from 'axios';
import { IsJwtExpired } from '../utils/is-jwt-expired';

export const BASE_URL = process.env.BASE_URL;

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    if (config.headers.requiresAuth) {
        const token = localStorage.getItem('accessToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { config, response } = error;

        if (response?.status === 401 && !config._retry) {
            config._retry = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken || IsJwtExpired(refreshToken)) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/account/signin';
                return Promise.reject(error);
            }

            try {
                const res = await axios.post('/auth/refresh', {}, { withCredentials: true });
                const newAccessToken = res.data.accessToken;

                localStorage.setItem('accessToken', newAccessToken);
                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                return api(config);
            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/account/signin';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
