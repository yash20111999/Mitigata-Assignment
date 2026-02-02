import React from 'react';
import { useProductStore } from '../../store/product.store';
import type { StockStatus } from '../../types/filters';

export const StockFilter: React.FC = () => {
    const stockStatus = useProductStore((state) => state.filters.stockStatus);
    const setFilter = useProductStore((state) => state.setFilter);

    const handleStockChange = (status: StockStatus) => {
        const newStatus = stockStatus.includes(status)
          ? stockStatus.filter(s => s !== status)
          : [...stockStatus, status];
        setFilter('stockStatus', newStatus);
    };

    return (
        <div className="mb-4">
            <h3 className="font-semibold text-[var(--text-secondary)] mb-2">Stock Status</h3>
            {(['in-stock', 'low-stock', 'out-of-stock'] as StockStatus[]).map(status => (
                <div key={status} className="flex items-center">
                    <input type="checkbox" id={status} checked={stockStatus.includes(status)} onChange={() => handleStockChange(status)} 
                        className="h-4 w-4 rounded border-[var(--border-default)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                    />
                    <label htmlFor={status} className="ml-2 text-[var(--text-secondary)]">{status}</label>
                </div>
            ))}
        </div>
    );
};
