// src/components/Orders/OrdersFilters.tsx

import { Search, Filter } from 'lucide-react';
import type { OrderFilters as FiltersType } from './useOrdersFilters';

interface OrdersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: FiltersType;
  setFilters: (filters: FiltersType | ((prev: FiltersType) => FiltersType)) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function OrdersFilters({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  hasActiveFilters,
  onClearFilters
}: OrdersFiltersProps) {
  return (
    <>
      {/* Búsqueda y botones de acción */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por número de órden..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <button
          className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 w-full sm:w-auto"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtrar <Filter size={16} />
        </button>
        {hasActiveFilters && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full sm:w-auto"
            onClick={onClearFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Panel de filtros avanzados */}
      {showFilters && (
        <div className="bg-white p-4 rounded-md mb-4 animate-in fade-in-20">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filtros avanzados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Filtro por Estado */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Estado</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              >
                <option value="">Todos los estados</option>
                <option value="pending">Pendiente</option>
                <option value="paid">Pagada</option>
              </select>
            </div>

            {/* Filtro por Método de Pago */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Método de Pago</label>
              <select
                value={filters.paymentMethod}
                onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              >
                <option value="">Todos los métodos</option>
                <option value="cash">Efectivo</option>
                <option value="transaction">Transferencia</option>
              </select>
            </div>

            {/* Filtro por Fecha de Inicio */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Desde</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              />
            </div>

            {/* Filtro por Fecha de Fin */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Hasta</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}