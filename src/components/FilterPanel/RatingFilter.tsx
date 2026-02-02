import React from 'react';
import { useProductStore } from '../../store/product.store';

export const RatingFilter: React.FC = () => {
    const minRating = useProductStore((state) => state.filters.minRating);
    const setFilter = useProductStore((state) => state.setFilter);

    return (
        <div className="mb-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-2">Rating</h3>
            <input type="range" min="0" max="5" step="0.1" value={minRating} onChange={e => setFilter('minRating', Number(e.target.value))} 
                className="w-full h-2 bg-[var(--bg-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
            />
            <span className="text-[var(--text-muted)] text-sm">{minRating.toFixed(1)} stars and up</span>
        </div>
    );
};
