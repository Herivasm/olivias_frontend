import api from '../lib/axios'

// INTERFAZ DEL INSUMO
export interface Supply {
    _id: string
    supplyName: string
    stock: number
    measure: string
    supplier: string
}

// INTERFAZ DEL PROVEEDOR
export interface Supplier {
    _id: string
    supplierName: string
    contact: string
    supplies?: Supply[] // Insumos que provee este proveedor
}

// OBTENER TODOS LOS PROVEEDORES
export async function getAllSuppliers(): Promise<Supplier[]> {
    const response = await api.get('/suppliers')
    return response.data
}

// CREAR UN NUEVO PROVEEDOR
export interface NewSupplierData {
    supplierName: string
    contact: string
}

export async function createSupplier(data: NewSupplierData) {
    await api.post('/suppliers', data)
}

// OBTENER PROVEEDOR POR ID CON SUS INSUMOS
export async function getSupplierById(id: string): Promise<Supplier> {
    const response = await api.get(`/suppliers/${id}`)
    return response.data
}

// OBTENER INSUMOS DE UN PROVEEDOR ESPECÍFICO (si usas endpoint separado)
export async function getSuppliesBySupplier(supplierId: string): Promise<Supply[]> {
    const response = await api.get(`/suppliers/${supplierId}/supplies`)
    return response.data
}

// ACTUALIZAR PROVEEDOR
export interface UpdateSupplierData {
    supplierName: string
    contact: string
}

export async function updateSupplier(id: string, data: UpdateSupplierData) {
    await api.put(`/suppliers/${id}`, data)
}

// ELIMINAR PROVEEDOR
export async function deleteSupplier(id: string) {
    await api.delete(`/suppliers/${id}`)
}