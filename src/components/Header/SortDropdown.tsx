import React, { useState, useRef, useEffect } from 'react';
import { useProductStore } from '../../store/product.store';
import type { SortOption } from '../../types/sort';
import { useMediaQuery } from '../../hooks/useMediaQuery';

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
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const [isMenuOpen, setMenuOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSortChange = (newSort: SortOption) => {
        setSort(newSort);
        setMenuOpen(false);
    };

    if (isDesktop) {
        return (
            <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="h-10 cursor-pointer rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)] focus:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        );
    }

    return (
        <div ref={wrapperRef} className="relative">
            <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="flex h-10 items-center gap-2 rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            >
                <span>Sort</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 top-full z-10 mt-2 w-56 origin-top-right rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-lg">
                    <div className="py-1">
                        {sortOptions.map(option => (
                            <button
                                key={option.value}
                                onClick={() => handleSortChange(option.value)}
                                className={`block w-full px-4 py-2 text-left text-sm ${sort === option.value ? 'font-semibold text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'} hover:bg-[var(--bg-muted)]`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
