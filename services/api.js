import axios from 'axios';
import adminStore from '@/store/admin/adminProfile';
import useUserStore from '@/store/user/userProfile';

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:8000/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Private API call helper that includes the auth-token
const privateApiCall = async (method, url, data = null, config = {}) => {
    // Try to get token from adminStore, userStore, or localStorage
    const adminToken = adminStore.getState().admin.token;
    const userToken = useUserStore.getState().user.authToken;
    const localToken = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    
    const token = adminToken || userToken || localToken;
    
    try {
        const response = await api({
            method,
            url,
            data,
            ...config,
            headers: {
                ...config.headers,
                'auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`API Error (${method} ${url}):`, error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const apiService = {
    get: (url, config) => privateApiCall('get', url, null, config),
    post: (url, data, config) => privateApiCall('post', url, data, config),
    put: (url, data, config) => privateApiCall('put', url, data, config),
    delete: (url, config) => privateApiCall('delete', url, null, config),
};

export default api;
