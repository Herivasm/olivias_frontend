import { isAxiosError } from "axios";
import api from "../lib/axios";
import { dashboardProductSchema, type Product, type ProductFormData } from "../types";

export async function createProduct(formData: ProductFormData) {
    try {
        const { data } = await api.post('/products', formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProducts() {
    try {
        const { data } = await api('/products')
        const response = dashboardProductSchema.safeParse(data)

        if (response.success) {
            return response.data
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProductById(id: Product['_id']) {
    try {
        const { data } = await api(`/products/${id}`)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProductAPIType = {
    formData: ProductFormData
    productId: Product['_id']
}

export async function updateProduct({ formData, productId }: ProductAPIType) {
    try {
        const { data } = await api.put(`/products/${productId}`, formData)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProduct(id: Product['_id']) {
    try {
        const { data } = await api.delete<string>(`/products/${id}`)
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}