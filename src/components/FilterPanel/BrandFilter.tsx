import React from 'react';
import { useProductStore } from '../../store/product.store';

export const BrandFilter: React.FC = () => {
    const products = useProductStore((state) => state.products);
    const brands = useProductStore((state) => state.filters.brands);
    const setFilter = useProductStore((state) => state.setFilter);

    const allBrands = [...new Set(products.map(p => p.brand))];

    return (
        <div className="mb-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-2">Brands</h3>
            <select multiple value={brands} onChange={e => setFilter('brands', Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full rounded-md border-[var(--border-default)] bg-[var(--bg-app)] focus:border-[var(--accent-primary)] focus:ring-0"
            >
                {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
        </div>
    );
};
