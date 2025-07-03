import { useState, useEffect, useMemo } from 'react';
import type { Supplier } from '../../api/SuppliersAPI';
import type { Supply } from '../../api/SuppliesAPI';

export interface SuppliersFilters {
  supply: string;
}

export const useSuppliersFilters = (
  suppliers: Supplier[],
  supplies: Supply[],
  onFiltersChange?: () => void
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Partial<SuppliersFilters>>({});

  const filteredSuppliers = useMemo(() => {
    let filtered = [...suppliers];

    // Lógica de búsqueda por término (nombre o contacto)
    if (searchTerm.trim()) {
      filtered = filtered.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (supplier.contact && supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // ✅ LÓGICA DE FILTRO POR INSUMO (CORREGIDA)
    if (filters.supply) {
      // 1. Obtener todos los IDs de proveedores que suministran el insumo seleccionado
      const supplierIdsForSelectedSupply = new Set<string>();
      
      supplies.forEach(supply => {
        // Comprueba si el nombre del insumo coincide con el filtro
        if (supply.supplyName === filters.supply) {
          // Añade todos los proveedores de este insumo al Set
          supply.suppliers.forEach(supplierInSupply => {
            supplierIdsForSelectedSupply.add(supplierInSupply._id);
          });
        }
      });
      
      // 2. Filtra la lista de proveedores para que solo incluya los que están en el Set
      filtered = filtered.filter(supplier => 
        supplierIdsForSelectedSupply.has(supplier._id)
      );
    }

    return filtered;
  }, [suppliers, supplies, searchTerm, filters]);

  // ✅ LÓGICA PARA OBTENER INSUMOS ÚNICOS (MEJORADA)
  const uniqueSupplies = useMemo(() => {
    const supplyNamesMap = new Map<string, { _id: string; supplyName: string }>();
    
    supplies.forEach(supply => {
      // Usamos el nombre del insumo como clave para garantizar que sea único
      if (supply.supplyName && !supplyNamesMap.has(supply.supplyName)) {
        supplyNamesMap.set(supply.supplyName, {
          // Usamos el nombre también como 'id' para el valor del filtro
          _id: supply.supplyName,
          supplyName: supply.supplyName,
        });
      }
    });

    return Array.from(supplyNamesMap.values())
      .sort((a, b) => a.supplyName.localeCompare(b.supplyName));
  }, [supplies]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      supply: ''
    });
    onFiltersChange?.();
  };

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter);

  useEffect(() => {
    onFiltersChange?.();
  }, [searchTerm, filters, onFiltersChange]);

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
  };
};