
import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
    cashClosingSchema,
    createCashClosingSchema, // Asegúrate de que este schema esté en tus types
    type CreateCashClosingFormData,
    type CashClosing,
} from "../types";
import { z } from "zod";

// Creamos un schema para la lista de cortes, que puede ser más ligero
const allCashClosingsSchema = z.array(
    cashClosingSchema.pick({
        _id: true,
        closingDate: true,
        totalSales: true,
        finalBalance: true,
    })
);

/**
 * Crea un nuevo reporte de corte de caja final.
 * @param formData - Los datos del formulario (fondo inicial, fecha, notas).
 * @returns El objeto del corte de caja recién creado.
 */
export async function createCashClosing(formData: CreateCashClosingFormData) {
    try {
        const { data } = await api.post('/cash-closings', formData);
        const response = cashClosingSchema.safeParse(data.cashClosing);
        if (response.success) {
            return response.data;
        } else {
            console.error("Error Zod en createCashClosing (respuesta):", response.error.issues);
            throw new Error("La respuesta del servidor al crear el corte no es válida");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo registrar el corte de caja");
    }
}

/**
 * Obtiene todos los cortes de caja históricos.
 * @returns Un array con los cortes de caja.
 */
export async function getAllClosings() {
    try {
        const { data } = await api.get('/cash-closings');
        const response = allCashClosingsSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            console.error("Error Zod en getAllClosings:", response.error.issues);
            throw new Error("La respuesta de la lista de cortes no es válida");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudieron obtener los cortes de caja");
    }
}

/**
 * Obtiene un corte de caja específico por su ID.
 * @param id - El ID del corte de caja a buscar.
 * @returns El objeto completo del corte de caja.
 */
export async function getClosingById(id: CashClosing['_id']) {
    try {
        const { data } = await api.get(`/cash-closings/${id}`);
        const response = cashClosingSchema.safeParse(data);
        if (response.success) {
            return response.data;
        } else {
            console.error("Error Zod en getClosingById:", response.error.issues);
            throw new Error("El corte de caja recibido no es válido");
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("No se pudo obtener el corte de caja");
    }
}