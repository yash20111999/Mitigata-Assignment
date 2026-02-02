import React, { useMemo } from 'react';
import { useProductStore } from '../../store/product.store';

export const CategoryFilter: React.FC = () => {
    const products = useProductStore((state) => state.products);
    const selectedCategories = useProductStore((state) => state.filters.categories);
    const setFilter = useProductStore((state) => state.setFilter);
    
    const topCategories = useMemo(() => {
        const categoryCounts = products.reduce((acc, product) => {
            const category = product.category?.trim();
            if (category) {
                acc[category] = (acc[category] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([category]) => category);
    }, [products]);

    const handleCategoryChange = (category: string) => {
        const newCategories = selectedCategories.includes(category)
            ? selectedCategories.filter(c => c !== category)
            : [...selectedCategories, category];
        setFilter('categories', newCategories);
    };

    return (
        <div className="mb-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-2">Category</h3>
            <div className="space-y-1">
                {topCategories.map(category => (
                    <div key={category} className="flex items-center rounded-md p-1 transition-colors hover:bg-[var(--bg-muted)]">
                        <input
                            type="checkbox"
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-primary)] focus:ring-0 focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]"
                        />
                        <label htmlFor={`category-${category}`} className="ml-2 w-full cursor-pointer text-[var(--text-secondary)] capitalize">
                            {category}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};