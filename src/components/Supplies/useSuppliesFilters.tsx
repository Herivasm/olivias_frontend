import { useState, useMemo } from 'react';
import type { Supply, Supplier } from '../../api/SuppliesAPI';

// Definimos la interfaz completa para los filtros
export interface ActiveFilters {
  supplier: string;
  measure: 'litros' | 'kilos' | '';
  stockRange: 'low' | 'medium' | 'high' | '';
}

export function useSuppliesFilters(
  supplies: Supply[],
  resetPagination: () => void
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Partial<ActiveFilters>>({});

  const uniqueSuppliers: Supplier[] = useMemo(() => {
    const allSuppliers = supplies.flatMap(supply => supply.suppliers).filter(Boolean);
    const unique = new Map<string, Supplier>();
    allSuppliers.forEach(supplier => {
      if (!unique.has(supplier._id)) {
        unique.set(supplier._id, supplier);
      }
    });
    return Array.from(unique.values()).sort((a, b) => a.supplierName.localeCompare(b.supplierName));
  }, [supplies]);

  const filteredSupplies = useMemo(() => {
    let filtered = supplies;
    const lowercasedTerm = searchTerm.toLowerCase();

    // Lógica de Búsqueda (Nombre de Insumo Y Nombre de Proveedor)
    if (searchTerm) {
      filtered = filtered.filter(supply =>
        supply.supplyName.toLowerCase().includes(lowercasedTerm) ||
        supply.suppliers.some(s => s.supplierName.toLowerCase().includes(lowercasedTerm))
      );
    }

    // Lógica de Filtro por Proveedor
    if (filters.supplier) {
      filtered = filtered.filter(supply =>
        supply.suppliers.some(s => s._id === filters.supplier)
      );
    }

    // Lógica de Filtro por Medida
    if (filters.measure) {
      filtered = filtered.filter(supply => supply.measure === filters.measure);
    }

    // Lógica de Filtro por Nivel de Stock
    if (filters.stockRange) {
      filtered = filtered.filter(supply => {
        const stock = supply.stock;
        if (filters.stockRange === 'low') return stock < 10;
        if (filters.stockRange === 'medium') return stock >= 10 && stock <= 49;
        if (filters.stockRange === 'high') return stock >= 50;
        return true;
      });
    }

    return filtered;
  }, [supplies, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    resetPagination();
  };
  
  const hasActiveFilters = searchTerm.length > 0 || Object.values(filters).some(val => val && val !== '');

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
    hasActiveFilters,
  };
}