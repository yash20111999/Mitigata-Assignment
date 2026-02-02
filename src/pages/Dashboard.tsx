import React, { useMemo, useState, useCallback } from 'react';
import { useProductStore } from '../store/product.store';
import { useProducts } from '../hooks/useProducts';
import { filterProducts } from '../utils/filterProducts';
import { sortProducts } from '../utils/sortProducts';
import { Header } from '../components/Header/Header';
import { FilterPanel } from '../components/FilterPanel/FilterPanel';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { useRehydrateFavorites } from '../hooks/useRehydrateFavorites';
import { ProductDetailModal } from '../components/Modal/ProductDetailModal';
import { ComparisonDrawer } from '../components/ComparisonDrawer/ComparisonDrawer';
import type { Product } from '../types/product';

export const Dashboard: React.FC = () => {
  useProducts(); // Fetch products on mount
  useRehydrateFavorites(); // Rehydrate favorites from localStorage on mount

  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const filters = useProductStore((state) => state.filters);
  const sort = useProductStore((state) => state.sort);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCompareDrawerOpen, setCompareDrawerOpen] = useState(false);
  const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort]
  );
    
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseDetailModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleOpenCompareDrawer = useCallback(() => {
    setCompareDrawerOpen(true);
  }, []);

  const handleCloseCompareDrawer = useCallback(() => {
    setCompareDrawerOpen(false);
  }, []);

  const toggleFilterPanel = useCallback(() => {
    setFilterPanelOpen(prev => !prev);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[var(--bg-app)] text-[var(--text-primary)]">
      <Header 
          onToggleFilterPanel={toggleFilterPanel} 
          viewMode={viewMode}
          setViewMode={setViewMode}
          onOpenCompareDrawer={handleOpenCompareDrawer}
      />
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] overflow-y-auto">
        <FilterPanel isOpen={isFilterPanelOpen} onClose={toggleFilterPanel} />
        <main>
          <div className="mx-auto max-w-7xl p-4 lg:p-6">
            {error && <p className="text-red-500">{error}</p>}
            <ProductGrid 
              products={sortedProducts} 
              loading={loading} 
              viewMode={viewMode}
              onProductSelect={handleProductSelect}
            />
          </div>
        </main>
      </div>
      <ProductDetailModal product={selectedProduct} onClose={handleCloseDetailModal} />
      <ComparisonDrawer isOpen={isCompareDrawerOpen} onClose={handleCloseCompareDrawer} />
    </div>
  );
};