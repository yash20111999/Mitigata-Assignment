import React from 'react';
import { useProductStore } from '../../store/product.store';

export const PriceRangeFilter: React.FC = () => {
    const priceRange = useProductStore((state) => state.filters.priceRange);
    const setFilter = useProductStore((state) => state.setFilter);

    return (
        <div className="mb-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-2">Price Range</h3>
            <input type="range" min="0" max="2000" value={priceRange[1]} onChange={e => setFilter('priceRange', [priceRange[0], Number(e.target.value)])} 
                className="w-full h-2 bg-[var(--bg-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
            />
            <span className="text-[var(--text-muted)] text-sm">Up to ${priceRange[1]}</span>
        </div>
    );
};
