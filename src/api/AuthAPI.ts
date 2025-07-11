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
        throw new Error('Error al procesar los datos del usuario');
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error('Error de conexión');
    }
}

export async function registerUser(formData: RegisterFormData) {
    try {
        const { data } = await api.post('/auth/register', formData);
        console.log('Respuesta de registro exitoso:', data); // DEBUG
        return data;
    } catch (error) {
        console.log('Error en registro:', error); // DEBUG
        if (isAxiosError(error) && error.response) {
            console.log('Error response data:', error.response.data); // DEBUG
            throw new Error(error.response.data.error);
        }
        throw new Error('Error de conexión');
    }
}

export async function loginUser(formData: LoginFormData) {
    try {
        const { data } = await api.post('/auth/login', formData);
        console.log('Respuesta de login exitoso:', data); // DEBUG
        localStorage.setItem('AUTH_TOKEN', data.token);
        return data;
    } catch (error) {
        console.log('Error en login:', error); // DEBUG
        if (isAxiosError(error) && error.response) {
            console.log('Error response data:', error.response.data); // DEBUG
            console.log('Error response status:', error.response.status); // DEBUG
            throw new Error(error.response.data.error);
        }
        throw new Error('Error de conexión');
    }
}