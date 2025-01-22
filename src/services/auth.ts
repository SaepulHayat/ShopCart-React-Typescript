import api from './api';
import { LoginCredentials, RegisterCredentials } from '../types/api.types';

const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    register: async (data: RegisterCredentials) => {
        const userData = {
            ...data,
            avatar: data.avatar || "https://api.lorem.space/image/face?w=640&h=480",
            role: "customer"
        };
        const response = await api.post('/users', userData);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    }
};

export default authService;