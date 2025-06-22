// src/components/Supplies/SuppliesFilters.tsx
import { Search, Filter } from 'lucide-react'
import type { SuppliesFilters as FiltersType } from './useSuppliesFilters'

interface SuppliesFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  filters: FiltersType
  setFilters: (filters: FiltersType | ((prev: FiltersType) => FiltersType)) => void
  uniqueSuppliers: { _id: string; supplierName: string }[]
  hasActiveFilters: boolean
  onClearFilters: () => void
}

export default function SuppliesFilters({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  uniqueSuppliers,
  hasActiveFilters,
  onClearFilters
}: SuppliesFiltersProps) {
  return (
    <>
      {/* Filtro y búsqueda */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="relative flex-1 w-full md:w-3/4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Buscar por nombre o proveedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <button 
          className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 w-full md:w-auto"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtrar <Filter size={16} />
        </button>
        {hasActiveFilters && (
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full md:w-auto"
            onClick={onClearFilters}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Panel de filtros avanzados */}
      {showFilters && (
        <div className="bg-white p-4 rounded-md mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filtros avanzados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por medida */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Medida</label>
              <select
                value={filters.measure}
                onChange={(e) => setFilters(prev => ({ ...prev, measure: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              >
                <option value="">Todas las medidas</option>
                <option value="litros">Litros</option>
                <option value="kilos">Kilos</option>
              </select>
            </div>

            {/* Filtro por stock */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nivel de stock</label>
              <select
                value={filters.stockRange}
                onChange={(e) => setFilters(prev => ({ ...prev, stockRange: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              >
                <option value="">Todos los niveles</option>
                <option value="low">Bajo (&lt; 10)</option>
                <option value="medium">Medio (10-49)</option>
                <option value="high">Alto (≥ 50)</option>
              </select>
            </div>

            {/* Filtro por proveedor */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Proveedor</label>
              <select
                value={filters.supplier}
                onChange={(e) => setFilters(prev => ({ ...prev, supplier: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              >
                <option value="">Todos los proveedores</option>
                {uniqueSuppliers.map((supplier) => (
                  <option key={supplier._id} value={supplier._id}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  )
}