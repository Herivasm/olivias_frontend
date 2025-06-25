// src/hooks/useSuppliesFilters.ts
import { useState, useEffect, useMemo } from 'react'
import type { Supply } from '../../api/SuppliesAPI'

export interface SuppliesFilters {
  measure: string
  stockRange: string
  supplier: string
}

export const useSuppliesFilters = (supplies: Supply[], onFiltersChange?: () => void) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SuppliesFilters>({
    measure: '',
    stockRange: '',
    supplier: ''
  })


  const filteredSupplies = useMemo(() => {
    let filtered = [...supplies]

    if (searchTerm.trim()) {
      filtered = filtered.filter(supply =>
        supply.supplyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supply.supplier?.supplierName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filters.measure) {
      filtered = filtered.filter(supply => supply.measure === filters.measure)
    }

    if (filters.stockRange) {
      switch (filters.stockRange) {
        case 'low':
          filtered = filtered.filter(supply => supply.stock < 10)
          break
        case 'medium':
          filtered = filtered.filter(supply => supply.stock >= 10 && supply.stock < 50)
          break
        case 'high':
          filtered = filtered.filter(supply => supply.stock >= 50)
          break
      }
    }


    if (filters.supplier) {
      filtered = filtered.filter(supply => supply.supplier?._id === filters.supplier)
    }

    return filtered
  }, [supplies, searchTerm, filters])


  const uniqueSuppliers = useMemo(() => {
    return supplies.reduce((acc, supply) => {
      if (supply.supplier && !acc.find(s => s._id === supply.supplier._id)) {
        acc.push(supply.supplier)
      }
      return acc
    }, [] as { _id: string; supplierName: string }[])
  }, [supplies])


  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      measure: '',
      stockRange: '',
      supplier: ''
    })
    onFiltersChange?.()
  }

  const hasActiveFilters = searchTerm || filters.measure || filters.stockRange || filters.supplier

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
    filteredSupplies,
    uniqueSuppliers,
    clearFilters,
    hasActiveFilters
  }
}