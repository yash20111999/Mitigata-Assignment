import React from 'react';
import { useProductStore } from '../../store/product.store';

export const CategoryFilter: React.FC = () => {
    const products = useProductStore((state) => state.products);
    const categories = useProductStore((state) => state.filters.categories);
    const setFilter = useProductStore((state) => state.setFilter);
    
    const allCategories = [...new Set(products.map(p => p.category))];

    return (
        <div className="mb-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-2">Category</h3>
            <select multiple value={categories} onChange={e => setFilter('categories', Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full rounded-md border-[var(--border-default)] bg-[var(--bg-app)] focus:border-[var(--accent-primary)] focus:ring-0"
            >
                {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>
    );
};
