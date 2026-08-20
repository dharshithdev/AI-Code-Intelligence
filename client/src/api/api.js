import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
    timeout: 50000,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.data);
        return response.data;
    },
    (error) => {
        if (error.response) {
            console.error('API Error Response:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;