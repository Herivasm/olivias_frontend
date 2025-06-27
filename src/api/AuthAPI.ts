import { isAxiosError } from "axios";
import api from "../lib/axios";
import { userSchema, type LoginFormData, type RegisterFormData } from "../types";

export async function getAuthenticatedUser() {
    try {
        const { data } = await api.get('/auth/user');
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function registerUser(formData: RegisterFormData) {
    try {
        const { data } = await api.post('/auth/register', formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function loginUser(formData: LoginFormData) {
    try {
        const { data } = await api.post('/auth/login', formData);
        localStorage.setItem('AUTH_TOKEN', data.token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}