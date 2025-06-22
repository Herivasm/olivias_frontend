import api from '../lib/axios'

export interface Supply {
  _id: string
  supplyName: string
  measure: string
  stock: number
  supplier: {
    _id: string
    supplierName: string
  }
  __v: number
}

export async function getAllSupplies(): Promise<Supply[]> {
  const response = await api.get('/supplies')
  return response.data
}

// INSERTAR NUEVOS INSUMOS

export interface NewSupplyData {
  supplyName: string
  measure: string
  stock: number
  supplier: string
}

export async function createSupply(data: NewSupplyData) {
  await api.post("/supplies", data)
}

// MOSTRAR PROVEEDORES PARA EL SELECT
export interface Supplier {
  _id: string
  supplierName: string
}

export async function getAllSuppliers(): Promise<Supplier[]> {
  const response = await api.get("/suppliers")
  return response.data
}

// OBTENER UN INSUMO POR LA ID

export async function getSupplyById(id: string): Promise<Supply> {
  const response = await api.get(`/supplies/${id}`)
  return response.data
}

// EDITAR UN INSUMO
export interface UpdateSupplyData {
  supplyName: string
  measure: string
  stock: number
  supplier: string
}

export async function updateSupply(id: string, data: UpdateSupplyData) {
  await api.put(`/supplies/${id}`, data)
}

// ELIMINAR UN INSUMO
export async function deleteSupply(id: string) {
  await api.delete(`/supplies/${id}`)
}