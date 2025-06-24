// src/components/Common/PaginationControls.tsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  totalItems: number
  startItem: number
  endItem: number
  canGoPrev: boolean
  canGoNext: boolean
  onGoToPage: (page: number) => void
  onPrevPage: () => void
  onNextPage: () => void
  onGoToFirstPage: () => void
  onGoToLastPage: () => void
}

export default function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  startItem,
  endItem,
  canGoPrev,
  canGoNext,
  onGoToPage,
  onPrevPage,
  onNextPage,
  onGoToFirstPage,
  onGoToLastPage
}: PaginationControlsProps) {
  // Generar números de página para mostrar
  const getVisiblePages = () => {
    const delta = 2 // Número de páginas a mostrar a cada lado de la actual
    const range = []
    const rangeWithDots = []

    // Calcular el rango de páginas a mostrar
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    // Agregar primera página
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    // Agregar páginas del rango
    rangeWithDots.push(...range)

    // Agregar última página
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 p-4 bg-white rounded-lg h-11">
      {/* Información de elementos */}
      <div className="text-sm text-gray-600">
        Mostrando {startItem} - {endItem} de {totalItems} elementos
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center gap-1">
        {/* Ir a primera página */}
        <button
          onClick={onGoToFirstPage}
          disabled={!canGoPrev}
          className={`p-2 rounded-md transition-colors ${
            canGoPrev
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Primera página"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Página anterior */}
        <button
          onClick={onPrevPage}
          disabled={!canGoPrev}
          className={`p-2 rounded-md transition-colors ${
            canGoPrev
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Página anterior"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Números de página */}
        <div className="flex items-center gap-1 mx-2">
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onGoToPage(page)}
              disabled={typeof page !== 'number'}
              className={`min-w-[40px] h-10 px-3 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                page === currentPage
                  ? 'bg-[#575B4F] text-white'
                  : typeof page === 'number'
                  ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  : 'text-gray-400 cursor-default'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Página siguiente */}
        <button
          onClick={onNextPage}
          disabled={!canGoNext}
          className={`p-2 rounded-md transition-colors ${
            canGoNext
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Página siguiente"
        >
          <ChevronRight size={16} />
        </button>

        {/* Ir a última página */}
        <button
          onClick={onGoToLastPage}
          disabled={!canGoNext}
          className={`p-2 rounded-md transition-colors ${
            canGoNext
              ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Última página"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  )
}