// src/components/Products/ProductFilters.tsx
import { Search, Filter } from 'lucide-react';

// Interfaz para el estado del rango de precios
interface PriceRange {
  min: string;
  max: string;
}

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categoryTranslations: { [key: string]: string };
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function ProductFilters({
  searchTerm,
  setSearchTerm,
  showFilters,
  setShowFilters,
  selectedCategory,
  setSelectedCategory,
  categoryTranslations,
  priceRange,
  setPriceRange,
  hasActiveFilters,
  onClearFilters
}: ProductFiltersProps) {
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: value });
  };

  return (
    <>
      {/* Barra de búsqueda y botones principales */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <div className="relative flex-1 w-full md:w-auto min-w-[250px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <button
          className="bg-white text-[#505341] px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-90 w-full sm:w-auto justify-center cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtrar <Filter size={16} />
        </button>
        {hasActiveFilters && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors w-full sm:w-auto justify-center"
            onClick={onClearFilters}
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Panel de filtros avanzados */}
      {showFilters && (
        <div className="bg-white p-4 rounded-md mb-4 animate-fade-in-down">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filtros avanzados</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por categoría */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
              >
                <option value="">Todas las Categorías</option>
                {Object.entries(categoryTranslations).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
            </div>
            
            {/* Filtros por precio */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Precio Mínimo</label>
              <input
                type="number"
                name="min"
                placeholder="Ej: 10"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Precio Máximo</label>
              <input
                type="number"
                name="max"
                placeholder="Ej: 100"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#575B4F]"
                min="0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}