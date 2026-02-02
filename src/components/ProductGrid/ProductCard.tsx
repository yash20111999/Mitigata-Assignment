import React, { useRef } from 'react';
import type { Product } from '../../types/product';
import { useProductStore } from '../../store/product.store';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
  onProductSelect: (product: Product) => void;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({ product, viewMode, onProductSelect }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(cardRef, { rootMargin: '200px' });
    const isVisible = !!entry?.isIntersecting;

    const toggleCompare = useProductStore((state) => state.toggleCompare);
    const toggleFavorite = useProductStore((state) => state.toggleFavorite);
    const compareIds = useProductStore((state) => state.compareIds);
    const favorites = useProductStore((state) => state.favorites);
    
    const isCompared = compareIds.includes(product.id);
    const isFavorite = favorites.includes(product.id);

    const stockStatus = product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';
    const stockBadgeStyle = 'bg-[var(--success-bg)] text-[var(--success-text)]';

    const handleFavoriteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(product.id);
    };

    const handleCompareClick = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      toggleCompare(product.id);
    };
    
    if (viewMode === 'list') {
        return (
            <div ref={cardRef} onClick={() => onProductSelect(product)} className="flex flex-col sm:flex-row gap-4 bg-[var(--bg-surface)] p-4 rounded-lg border border-transparent transition-shadow duration-200 hover:shadow-md cursor-pointer">
                <div className="w-full sm:w-32 h-32 aspect-square shrink-0">
                  {isVisible ? (
                    <img loading="lazy" src={product.thumbnail} alt={product.title} className="w-full h-full object-cover rounded-md"/>
                  ) : (
                    <div className="w-full h-full bg-[var(--bg-muted)] rounded-md"></div>
                  )}
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-medium text-[var(--text-primary)] line-clamp-2">{product.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm">{product.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p>⭐ {product.rating}</p>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stockBadgeStyle}`}>{stockStatus}</span>
                    </div>
                    <p className="text-xl font-semibold text-[var(--text-primary)] mt-2">${product.price}</p>
                </div>
                <div className="flex flex-row sm:flex-col justify-start items-center sm:items-end gap-2 shrink-0">
                    <button onClick={handleFavoriteClick} className="text-2xl rounded-full p-1 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">{isFavorite ? '❤️' : '🤍'}</button>
                    <label onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 cursor-pointer rounded-md p-1 transition-colors hover:bg-[var(--bg-muted)]">
                      <input type="checkbox" checked={isCompared} onChange={handleCompareClick} className="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-primary)] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]" />
                      <span className="text-[var(--text-secondary)]">Compare</span>
                    </label>
                </div>
            </div>
        )
    }

    return (
        <div ref={cardRef} onClick={() => onProductSelect(product)} className="bg-[var(--bg-surface)] p-4 rounded-lg border border-transparent flex flex-col transition-shadow duration-200 hover:shadow-md cursor-pointer">
            <div className="w-full aspect-square mb-4">
              {isVisible ? (
                <img loading="lazy" src={product.thumbnail} alt={product.title} className="w-full h-full object-cover rounded-md"/>
              ) : (
                <div className="w-full h-full bg-[var(--bg-muted)] rounded-md"></div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-[var(--text-primary)] line-clamp-2 h-14">{product.title}</h3>
              <div className="flex justify-between items-center mt-2">
                  <p className="text-lg font-semibold text-[var(--text-primary)]">${product.price}</p>
                  <p className="text-[var(--text-secondary)]">⭐ {product.rating}</p>
              </div>
              <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${stockBadgeStyle}`}>{stockStatus}</span>
            </div>
            <div className='flex justify-between items-center pt-4 mt-auto'>
                <label onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 cursor-pointer rounded-md p-1 transition-colors hover:bg-[var(--bg-muted)]">
                  <input type="checkbox" checked={isCompared} onChange={handleCompareClick} className="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-primary)] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]" />
                  <span className="text-[var(--text-secondary)]">Compare</span>
                </label>
                <button onClick={handleFavoriteClick} className="text-2xl rounded-full p-1 transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">{isFavorite ? '❤️' : '🤍'}</button>
            </div>
        </div>
    );
};

export const ProductCard = React.memo(ProductCardComponent);