import React from 'react';
import type{ Product } from '../../types/product';
import { useProductStore } from '../../store/product.store';
import { ModalBase } from './ModalBase';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const toggleCompare = useProductStore((state) => state.toggleCompare);
  const favorites = useProductStore((state) => state.favorites);
  const compareIds = useProductStore((state) => state.compareIds);

  if (!product) return null;

  const isFavorite = favorites.includes(product.id);
  const isCompared = compareIds.includes(product.id);
  const stockStatus = product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock';
  const stockBadgeStyle = 'bg-[var(--success-bg)] text-[var(--success-text)]';

  return (
    <ModalBase isOpen={!!product} onClose={onClose} ariaLabel="Product Details">
      <div className="flex h-full flex-col">
        <div className="relative flex-shrink-0 border-b border-[var(--border-default)] p-4 sm:p-6">
          <h2 className="pr-10 text-xl font-bold text-[var(--text-primary)]">{product.title}</h2>
          <button onClick={onClose} className="absolute top-1/2 right-4 -translate-y-1/2 rounded-md p-2 text-2xl text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">&times;</button>
        </div>
        <div className="flex-1 max-h-[80vh] overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img src={product.images[0]} alt={product.title} className="aspect-square h-auto w-full rounded-lg object-cover" />
            <div className="flex flex-col">
              <p className="text-md text-[var(--text-secondary)]">{product.brand}</p>
              <p className="my-4 text-3xl font-bold text-[var(--text-primary)]">${product.price}</p>
              <div className="flex items-center gap-4 text-sm">
                <p className="text-[var(--text-secondary)]">⭐ {product.rating}</p>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${stockBadgeStyle}`}>{stockStatus}</span>
              </div>
              <p className="mt-4 text-[var(--text-secondary)]">{product.description}</p>
              <div className="mt-auto flex gap-2 border-t border-[var(--border-default)] pt-4">
                <button onClick={() => toggleFavorite(product.id)} className="w-full rounded-md bg-[var(--bg-muted)] py-2 font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-default)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button onClick={() => toggleCompare(product.id)}  className="w-full rounded-md bg-[var(--bg-muted)] py-2 font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-default)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">
                  {isCompared ? 'Remove from Compare' : 'Add to Compare'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};