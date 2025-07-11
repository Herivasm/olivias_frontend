// src/hooks/usePagination.ts
import { useState, useMemo } from 'react'

export interface PaginationConfig {
  itemsPerPage?: number
  initialPage?: number
}

export const usePagination = <T>(
  items: T[], 
  config: PaginationConfig = {}
) => {
  const { itemsPerPage = 10, initialPage = 1 } = config
  
  const [currentPage, setCurrentPage] = useState(initialPage)

  // Calcular totales
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Obtener items de la página actual
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  // Funciones de navegación
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToFirstPage = () => setCurrentPage(1)
  const goToLastPage = () => setCurrentPage(totalPages)

  // Reset a la primera página cuando cambien los items
  const resetPagination = () => setCurrentPage(1)

  // Información de la página actual
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  // Estados de navegación
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < totalPages
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return {
    // Items paginados
    paginatedItems,
    
    // Información de estado
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    startItem,
    endItem,
    
    // Estados de navegación
    canGoPrev,
    canGoNext,
    isFirstPage,
    isLastPage,
    
    // Funciones de navegación
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    resetPagination
  }
}