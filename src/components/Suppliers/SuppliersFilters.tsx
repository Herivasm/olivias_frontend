import { Search, Filter } from 'lucide-react';
// Cambiamos el alias para mayor claridad
import type { SuppliersFilters as FiltersObject } from './useSuppliersFilters';

// ✅ CORRECCIÓN: Ajustamos la interfaz para que acepte un objeto parcial de filtros
interface SuppliersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: Partial<FiltersObject>; // Se espera un objeto parcial
  setFilters: (filters: Partial<FiltersObject> | ((prev: Partial<FiltersObject>) => Partial<FiltersObject>)) => void; // Se ajusta el tipo del setter
  uniqueSupplies: { _id: string; supplyName: string }[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function SuppliersFilters({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  uniqueSupplies,
  hasActiveFilters,
  onClearFilters
}: SuppliersFiltersProps) {
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
            placeholder="Buscar por nombre o contacto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <button 
          className="cursor-pointer bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 w-full md:w-auto"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Filtro por insumo */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Filtrar por insumo que suministran
              </label>
              <select
                // ✅ CORRECCIÓN: Se añade '|| ""' para manejar el caso en que el filtro no esté definido
                value={filters.supply || ''} 
                onChange={(e) => setFilters(prev => ({ ...prev, supply: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              >
                <option value="">Todos los proveedores</option>
                {uniqueSupplies.map((supply) => (
                  <option key={supply._id} value={supply._id}>
                    {supply.supplyName}
                  </option>
                ))}
              </select>
              {uniqueSupplies.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  No hay insumos registrados con proveedores asignados
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  )
}