import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
    dashboardProductSchema,
    productSchema,
    type Product,
    type ProductFormData
} from "../types";

type ProductResponse = {
    message: string;
    product: Product;
}

export async function createProduct(formData: ProductFormData) {
    try {
        const { data } = await api.post<ProductResponse>('/products', formData);

        const result = productSchema.safeParse(data.product);
        if (!result.success) {
            throw new Error("Respuesta inválida del servidor al crear producto");
        }

        return result.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

export async function getProducts() {
    try {
        const { data } = await api.get('/products');
        const response = dashboardProductSchema.safeParse(data);

        if (!response.success) {
            throw new Error("Datos de productos no válidos");
        }
        return response.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

export async function getProductById(id: Product['_id']) {
    try {
        const { data } = await api.get(`/products/${id}`);
        const result = productSchema.safeParse(data);
        if (!result.success) {
            throw new Error("Producto no válido recibido del servidor");
        }
        return result.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

type ProductAPIType = {
    formData: ProductFormData
    productId: Product['_id']
}

export async function updateProduct({ formData, productId }: ProductAPIType) {
    try {
        const { data } = await api.put<ProductResponse>(`/products/${productId}`, formData);

        const result = productSchema.safeParse(data.product);
        if (!result.success) {
            throw new Error("Respuesta inválida del servidor al actualizar producto");
        }

        return result.data;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}

export async function deleteProduct(id: Product['_id']) {
    try {
        const { data } = await api.delete<{ message: string }>(`/products/${id}`);
        return data.message;

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
}