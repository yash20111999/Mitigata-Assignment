import React, { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useProductStore } from '../../store/product.store';

interface ComparisonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({ isOpen, onClose }) => {
  const products = useProductStore((state) => state.products);
  const compareIds = useProductStore((state) => state.compareIds);
  const toggleCompare = useProductStore((state) => state.toggleCompare);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const comparedProducts = useMemo(
    () => products.filter((p) => compareIds.includes(p.id)),
    [products, compareIds]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product Comparison"
      className={`fixed inset-0 z-40 ${isOpen ? 'visible' : 'invisible'}`}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`absolute top-0 right-0 flex h-full w-full max-w-md transform flex-col bg-[var(--bg-surface)] shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-default)] p-4">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">Compare Products</h2>
          <button onClick={onClose} className="text-2xl text-[var(--text-muted)] hover:text-[var(--text-primary)]">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {comparedProducts.length < 2 ? (
            <p className="text-[var(--text-muted)]">Add at least 2 products to compare.</p>
          ) : (
            <div className="space-y-4">
              {comparedProducts.map((product) => (
                <div key={product.id} className="flex gap-4 border-b border-[var(--border-default)] pb-4">
                  <img src={product.thumbnail} alt={product.title} className="h-20 w-20 shrink-0 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Brand: {product.brand}</p>
                    <p className="text-sm text-[var(--text-secondary)]">Rating: ⭐ {product.rating}</p>
                    <p className="text-sm text-[var(--text-secondary)]">Stock: {product.stock}</p>
                    <p className="font-bold text-[var(--text-primary)] mt-1">${product.price}</p>
                  </div>
                  <button onClick={() => toggleCompare(product.id)} className="text-sm text-[var(--accent-primary)] hover:underline self-start">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
