import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { SkeletonGrid } from '../Skeleton/SkeletonGrid';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  viewMode: 'grid' | 'list';
  onProductSelect: (product: Product) => void;
}

const ITEMS_PER_PAGE = 20;

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, viewMode, onProductSelect }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const paginatedProducts = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);


  if (loading) {
    return <SkeletonGrid />;
  }

  if (products.length === 0) {
    return <p className="text-center text-[var(--text-muted)]">No products found.</p>;
  }

  return (
    <div>
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {paginatedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode} 
                  onProductSelect={onProductSelect}
                />
            ))}
        </div>
        <div className="flex justify-center mt-6">
            {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                <button 
                    key={page} 
                    onClick={() => setCurrentPage(page)}
                    className={`mx-1 rounded-md px-3 py-1 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${currentPage === page ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-muted)]'}`}
                >
                    {page}
                </button>
            ))}
        </div>
    </div>
  );
};