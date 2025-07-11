// src/components/Products/useProductFilters.ts
import { useState, useMemo } from 'react';
import type { Product } from '../../types';

interface PriceRange {
  min: string;
  max: string;
}

export function useProductFilters(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: '', max: '' });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    const minPrice = parseFloat(priceRange.min);
    const maxPrice = parseFloat(priceRange.max);

    if (!isNaN(minPrice)) {
      filtered = filtered.filter(product => product.price >= minPrice);
    }
    if (!isNaN(maxPrice)) {
      filtered = filtered.filter(product => product.price <= maxPrice);
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setShowFilters(false);
  };

  const hasActiveFilters =
    searchTerm.length > 0 ||
    selectedCategory.length > 0 ||
    priceRange.min !== '' ||
    priceRange.max !== '';

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    hasActiveFilters,
    clearFilters,
    showFilters,
    setShowFilters,
    priceRange,
    setPriceRange,
  };
}