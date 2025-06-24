import { useState, useEffect, useMemo } from 'react'
import type { Supplier } from '../../api/SuppliersAPI'
import type { Supply } from '../../api/SuppliesAPI'

export interface SuppliersFilters {
  supply: string // ID del insumo para filtrar proveedores
}

export const useSuppliersFilters = (
  suppliers: Supplier[], 
  supplies: Supply[], // Lista de insumos para filtrar
  onFiltersChange?: () => void
) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SuppliersFilters>({
    supply: ''
  })

  // Función para aplicar filtros y búsqueda
  const filteredSuppliers = useMemo(() => {
    let filtered = [...suppliers]

    // Aplicar búsqueda por término
    if (searchTerm.trim()) {
      filtered = filtered.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Aplicar filtro por insumo
    if (filters.supply) {
      // Encontrar el nombre del insumo seleccionado
      const selectedSupplyName = supplies.find(supply => supply._id === filters.supply)?.supplyName
      
      if (selectedSupplyName) {
        // Obtener todos los proveedores que suministran insumos con ese nombre
        const supplierIdsWithSupply = supplies
          .filter(supply => supply.supplyName === selectedSupplyName && supply.supplier)
          .map(supply => supply.supplier?._id)
          .filter(Boolean) 
        
        filtered = filtered.filter(supplier => 
          supplierIdsWithSupply.includes(supplier._id)
        )
      }
    }

    return filtered
  }, [suppliers, supplies, searchTerm, filters])

  // Obtener lista única de insumos para el filtro (solo nombres únicos)
  const uniqueSupplies = useMemo(() => {
    const suppliesWithSuppliers = supplies.filter(supply => supply.supplier)
    
    // Crear un Map para agrupar por nombre de insumo
    const suppliesMap = new Map<string, { _id: string; supplyName: string }>()
    
    suppliesWithSuppliers.forEach(supply => {
      if (!suppliesMap.has(supply.supplyName)) {
        suppliesMap.set(supply.supplyName, {
          _id: supply._id,
          supplyName: supply.supplyName
        })
      }
    })
    
    // Convertir el Map a array y ordenar alfabéticamente
    return Array.from(suppliesMap.values())
      .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
  }, [supplies])

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      supply: ''
    })
    onFiltersChange?.() // Callback para resetear paginación
  }

  // Verificar si hay filtros activos
  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter)

  // Notificar cuando cambien los filtros
  useEffect(() => {
    onFiltersChange?.()
  }, [searchTerm, filters, onFiltersChange])

  return {
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    filters,
    setFilters,
    filteredSuppliers,
    uniqueSupplies,
    clearFilters,
    hasActiveFilters
  }
}