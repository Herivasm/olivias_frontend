import api from '../lib/axios'

interface EmbeddedSupplier {
  _id: string;
  supplierName: string;
}

export interface Supply {
  _id: string
  supplyName: string
  measure: string
  stock: number
  suppliers: EmbeddedSupplier[]
  __v: number
}

export async function getAllSupplies(): Promise<Supply[]> {
  const response = await api.get('/supplies')
  return response.data
}

export interface NewSupplyData {
  supplyName: string
  measure: string
  stock: number
  supplier: string
}

export async function createSupply(data: NewSupplyData) {
  await api.post("/supplies", data)
}

export interface Supplier {
  _id: string
  supplierName: string
}

export async function getAllSuppliers(): Promise<Supplier[]> {
  const response = await api.get("/suppliers")
  return response.data
}

export async function getSupplyById(id: string): Promise<Supply> {
  const response = await api.get(`/supplies/${id}`)
  return response.data
}

export interface UpdateSupplyData {
  supplyName: string
  measure: string
  stock: number
  suppliers: string[]
}

export async function updateSupply(id: string, data: UpdateSupplyData) {
  await api.put(`/supplies/${id}`, data)
}

export async function deleteSupply(id: string) {
  await api.delete(`/supplies/${id}`)
}