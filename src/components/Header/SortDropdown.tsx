import React from 'react';
import { useProductStore } from '../../store/product.store';
import type { SortOption } from '../../types/sort';

const SortOptionEnum = {
    RATING_DESC: 'rating-desc',
    RATING_ASC: 'rating-asc',
    PRICE_DESC: 'price-desc',
    PRICE_ASC: 'price-asc',
    TITLE_ASC: 'title-asc',
    TITLE_DESC: 'title-desc',
} as const;

const sortOptions = [
    { value: SortOptionEnum.RATING_DESC, label: 'Rating: High to Low' },
    { value: SortOptionEnum.RATING_ASC, label: 'Rating: Low to High' },
    { value: SortOptionEnum.PRICE_DESC, label: 'Price: High to Low' },
    { value: SortOptionEnum.PRICE_ASC, label: 'Price: Low to High' },
    { value: SortOptionEnum.TITLE_ASC, label: 'Title: A-Z' },
    { value: SortOptionEnum.TITLE_DESC, label: 'Title: Z-A' },
];

export const SortDropdown: React.FC = () => {
    const sort = useProductStore((state) => state.sort);
    const setSort = useProductStore((state) => state.setSort);

    return (
        <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-10 cursor-pointer rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
        >
            {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
};
