import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
    dashboardOrderSchema,
    orderSchema,
    type Order,
    type CreateOrderFormData,
    type EditOrderFormData,
    dailySalesReportSchema
} from "../types";

/**
 * Crea una nueva orden en la base de datos.
 */
export async function createOrder(formData: CreateOrderFormData) {
    try {
        const url = '/orders';
        const { data } = await api.post(url, formData);

        console.log("Respuesta CRUDA completa del backend:", data);
        const orderToValidate = data.order;
        console.log("Objeto que se pasará a Zod para validar:", orderToValidate);

        const response = orderSchema.safeParse(data.order);
        if (response.success) {
            return response.data;
        } else {
            throw new Error("La respuesta del servidor al crear la orden no es válida");
        }


    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo crear la orden");
    }
}

/**
 * Obtiene todas las órdenes de la base de datos.
 * @returns Un array con los datos de las órdenes para el dashboard.
 */
export async function getOrders() {
    try {
        const url = '/orders';
        const { data } = await api.get(url);
        const response = dashboardOrderSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            console.error("Error de validación Zod:", response.error.issues);
            throw new Error("Los datos de las órdenes recibidos no son válidos");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudieron obtener las órdenes");
    }
}

/**
 * Obtiene una orden específica por su ID.
 * @param id - El ID de la orden a buscar.
 * @returns El objeto completo de la orden.
 */
export async function getOrderById(id: Order['_id']) {
    try {
        const url = `/orders/${id}`;
        const { data } = await api.get(url);
        const response = orderSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            console.error("Error de validación Zod:", response.error.issues);
            throw new Error("La orden recibida no es válida");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo obtener la orden");
    }
}

type UpdateOrderAPIType = {
    formData: EditOrderFormData;
    orderId: string;
}

/**
 * Actualiza una orden existente.
 * @param formData - Los datos a actualizar.
 * @param orderId - El ID de la orden a actualizar.
 * @returns El objeto de la orden actualizada.
 */
export async function updateOrder({ formData, orderId }: UpdateOrderAPIType) {
    try {
        const url = `/orders/${orderId}`;
        const { data } = await api.put(url, formData);

        const response = orderSchema.safeParse(data.order);
        if (response.success) {
            return response.data;
        } else {
            console.error("Error de validación Zod en updateOrder:", response.error.issues);
            throw new Error("La respuesta del servidor al actualizar la orden no es válida");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo actualizar la orden");
    }
}

/**
 * Elimina una orden de la base de datos.
 * @param id - El ID de la orden a eliminar.
 * @returns Un mensaje de confirmación.
 */
export async function deleteOrder(id: Order['_id']) {
    try {
        const url = `/orders/${id}`;
        const { data } = await api.delete(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo eliminar la orden");
    }
}

/**
 * Obtiene un resumen de ventas y la lista de órdenes para una fecha específica.
 * @param date - La fecha a consultar en formato YYYY-MM-DD.
 * @returns Un objeto con el resumen y la lista de órdenes.
 */
export async function getSalesByDate(date: string) {
    try {
        const { data } = await api.get('/orders/by-date', {
            params: { date }
        });
        const response = dailySalesReportSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            console.error("Error de validación Zod en getSalesByDate:", response.error.issues);
            throw new Error("La respuesta del reporte diario no es válida");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo obtener el reporte de ventas");
    }
}

export type { Order };
