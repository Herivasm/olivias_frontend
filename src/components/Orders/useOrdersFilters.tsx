// src/components/Orders/useOrdersFilters.tsx (Corregido sin tocar types)

import { useState, useMemo, useEffect } from 'react';
import { z } from 'zod'; // <-- 1. Importar Zod
// 2. Importar el schema en lugar del tipo
import { dashboardOrderSchema } from '../../types'; 

// 3. Inferir el tipo localmente a partir del schema
type DashboardOrder = z.infer<typeof dashboardOrderSchema>[number];

export interface OrderFilters {
  status: string;
  paymentMethod: string;
  startDate: string;
  endDate: string;
}

// 4. Usar el tipo localmente inferido
export const useOrdersFilters = (orders: DashboardOrder[], onFiltersChange?: () => void) => {
  // ... el resto del archivo no cambia ...
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>({
    status: '',
    paymentMethod: '',
    startDate: '',
    endDate: ''
  });

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (searchTerm.trim()) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    if (filters.paymentMethod) {
      filtered = filtered.filter(order => order.paymentMethod === filters.paymentMethod);
    }
    
    if (filters.startDate) {
        filtered = filtered.filter(order => new Date(order.createdAt) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter(order => new Date(order.createdAt) <= endDate);
    }

    return filtered;
  }, [orders, searchTerm, filters]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      status: '',
      paymentMethod: '',
      startDate: '',
      endDate: ''
    });
    setShowFilters(false);
    onFiltersChange?.();
  };

  const hasActiveFilters = 
    searchTerm.trim() !== '' || 
    filters.status !== '' || 
    filters.paymentMethod !== '' ||
    filters.startDate !== '' ||
    filters.endDate !== '';

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
    filteredOrders,
    clearFilters,
    hasActiveFilters
  };
};