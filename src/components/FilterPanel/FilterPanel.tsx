import React from 'react';
import { useProductStore } from '../../store/product.store';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { RatingFilter } from './RatingFilter';
import { StockFilter } from './StockFilter';
import { BrandFilter } from './BrandFilter';
import { FavoritesFilter } from './FavoritesFilter';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  const clearFilters = useProductStore((state) => state.clearFilters);
    
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-72 transform flex-col border-r border-[var(--border-default)] bg-[var(--bg-surface)] transition-transform duration-300 ease-in-out lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='flex-shrink-0 p-4'>
          <div className='flex justify-between items-center'>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Filters</h2>
              <button onClick={onClose} className="lg:hidden rounded-md p-1 text-2xl text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">&times;</button>
          </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4">
          <FavoritesFilter />
          <CategoryFilter />
          <PriceRangeFilter />
          <RatingFilter />
          <StockFilter />
          <BrandFilter />
      </div>
      
      <div className="mt-auto flex-shrink-0 border-t border-[var(--border-default)] p-4">
          <button onClick={clearFilters} className="w-full rounded-md bg-[var(--bg-muted)] py-2 font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--border-default)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">Clear Filters</button>
      </div>
    </aside>
  );
};
