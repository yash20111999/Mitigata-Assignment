import React, { useEffect } from 'react';
import { useProductStore } from '../../store/product.store';
import { useDebounce } from '../../hooks/useDebounce';

export const SearchBar: React.FC = () => {
    const search = useProductStore((state) => state.filters.search);
    const setFilter = useProductStore((state) => state.setFilter);
    const [searchTerm, setSearchTerm] = React.useState(search);
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (debouncedSearch !== search) {
            setFilter('search', debouncedSearch);
        }
    }, [debouncedSearch, search, setFilter]);

    return (
        <div className="relative flex-1 max-w-md">
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-app)] pl-4 pr-10 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-0"
            />
        </div>
    );
};
