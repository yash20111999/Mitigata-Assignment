import React from 'react';
import { useProductStore } from '../../store/product.store';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { RatingFilter } from './RatingFilter';
import { StockFilter } from './StockFilter';
import { BrandFilter } from './BrandFilter';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  const clearFilters = useProductStore((state) => state.clearFilters);
    
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-72 transform border-r border-[var(--border-default)] bg-[var(--bg-surface)] p-4 transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-auto lg:self-start lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
        <div className='flex justify-between items-center mb-4'>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Filters</h2>
            <button onClick={onClose} className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)]">&times;</button>
        </div>
      
        <CategoryFilter />
        <PriceRangeFilter />
        <RatingFilter />
        <StockFilter />
        <BrandFilter />
      
      <button onClick={clearFilters} className="w-full rounded-md bg-[var(--bg-muted)] py-2 font-semibold text-[var(--text-secondary)] hover:bg-[var(--border-default)]">Clear Filters</button>
    </aside>
  );
};
