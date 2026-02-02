import React, { useMemo } from 'react';
import { useProductStore } from '../../store/product.store';

export const BrandFilter: React.FC = () => {
    const products = useProductStore((state) => state.products);
    const selectedBrands = useProductStore((state) => state.filters.brands);
    const setFilter = useProductStore((state) => state.setFilter);

    const topBrands = useMemo(() => {
        const brandCounts = products.reduce((acc, product) => {
            const brand = product.brand?.trim();
            if (brand) {
                acc[brand] = (acc[brand] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(brandCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([brand]) => brand);
    }, [products]);

    const handleBrandChange = (brand: string) => {
        const newBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        setFilter('brands', newBrands);
    };

    return (
        <div className="mb-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-2">Brands</h3>
            <div className="space-y-1">
                {topBrands.map(brand => (
                    <div key={brand} className="flex items-center rounded-md p-1 transition-colors hover:bg-[var(--bg-muted)]">
                        <input
                            type="checkbox"
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            className="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-primary)] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]"
                        />
                        <label htmlFor={`brand-${brand}`} className="ml-2 w-full cursor-pointer text-[var(--text-secondary)]">
                            {brand}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};