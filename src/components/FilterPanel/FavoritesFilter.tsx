import React from 'react';
import { useProductStore } from '../../store/product.store';

export const FavoritesFilter: React.FC = () => {
    const showFavorites = useProductStore((state) => state.filters.favoritesOnly);
    const setFilter = useProductStore((state) => state.setFilter);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter('favoritesOnly', e.target.checked);
    };

    return (
        <div className="mb-4 border-b border-[var(--border-default)] pb-4">
            <div className="flex items-center rounded-md p-1 transition-colors hover:bg-[var(--bg-muted)]">
                <input
                    type="checkbox"
                    id="show-favorites"
                    checked={showFavorites}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-primary)] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]"
                />
                <label htmlFor="show-favorites" className="ml-2 w-full cursor-pointer text-[var(--text-secondary)]">
                    Show favorites only
                </label>
            </div>
        </div>
    );
};
