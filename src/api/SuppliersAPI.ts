import api from '../lib/axios'

// INTERFAZ DEL PROVEEDOR
export interface Supplier {
    _id: string
    supplierName: string
    contact: string
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

// OBTENER PROVEEDOR POR ID
export async function getSupplierById(id: string): Promise<Supplier> {
    const response = await api.get(`/suppliers/${id}`)
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
