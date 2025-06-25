import { useState, useEffect, useMemo } from 'react'
import type { Supplier } from '../../api/SuppliersAPI'
import type { Supply } from '../../api/SuppliesAPI'

export interface SuppliersFilters {
  supply: string 
}

export const useSuppliersFilters = (
  suppliers: Supplier[], 
  supplies: Supply[], 
  onFiltersChange?: () => void
) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SuppliersFilters>({
    supply: ''
  })


  const filteredSuppliers = useMemo(() => {
    let filtered = [...suppliers]


    if (searchTerm.trim()) {
      filtered = filtered.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

  
    if (filters.supply) {
     
      const selectedSupplyName = supplies.find(supply => supply._id === filters.supply)?.supplyName
      
      if (selectedSupplyName) {
       
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


  const uniqueSupplies = useMemo(() => {
    const suppliesWithSuppliers = supplies.filter(supply => supply.supplier)

    const suppliesMap = new Map<string, { _id: string; supplyName: string }>()
    
    suppliesWithSuppliers.forEach(supply => {
      if (!suppliesMap.has(supply.supplyName)) {
        suppliesMap.set(supply.supplyName, {
          _id: supply._id,
          supplyName: supply.supplyName
        })
      }
    })
    

    return Array.from(suppliesMap.values())
      .sort((a, b) => a.supplyName.localeCompare(b.supplyName))
  }, [supplies])

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      supply: ''
    })
    onFiltersChange?.() 
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter)

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