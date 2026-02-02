import React from 'react';
import type { Product } from '../../types/product';
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
      <div className="p-4 sm:p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-[var(--text-muted)]">&times;</button>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <img src={product.images[0]} alt={product.title} className="w-full h-auto aspect-square object-cover rounded-lg" />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{product.title}</h2>
            <p className="text-md text-[var(--text-secondary)]">{product.brand}</p>
            <p className="text-3xl font-bold text-[var(--text-primary)] my-4">${product.price}</p>
            <div className="flex items-center gap-4 text-sm">
              <p className="text-[var(--text-secondary)]">⭐ {product.rating}</p>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${stockBadgeStyle}`}>{stockStatus}</span>
            </div>
            <p className="text-[var(--text-secondary)] mt-4 flex-grow">{product.description}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={() => toggleFavorite(product.id)} className="w-full rounded-md py-2 font-semibold bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--border-default)]">
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              <button onClick={() => toggleCompare(product.id)}  className="w-full rounded-md py-2 font-semibold bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-[var(--border-default)]">
                {isCompared ? 'Remove from Compare' : 'Add to Compare'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalBase>
  );
};
