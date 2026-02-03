import React, { useState, useEffect } from 'react';
import { useProductStore } from '../../store/product.store';

export const ReviewDateFilter: React.FC = () => {
  const reviewDateRange = useProductStore((state) => state.filters.reviewDateRange);
  const setFilter = useProductStore((state) => state.setFilter);

  const [localStartDate, setLocalStartDate] = useState(reviewDateRange?.start || '');
  const [localEndDate, setLocalEndDate] = useState(reviewDateRange?.end || '');

  // Sync local state if global filters are cleared externally
  useEffect(() => {
    if (reviewDateRange?.start === null && reviewDateRange?.end === null) {
      setLocalStartDate('');
      setLocalEndDate('');
    }
  }, [reviewDateRange]);

  const handleApply = () => {
    setFilter('reviewDateRange', {
      start: localStartDate,
      end: localEndDate,
    });
  };

  const isApplyDisabled = !localStartDate || !localEndDate;

  return (
    <div className="p-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-2">Filter by Review Date</h3>
      <div className="space-y-2">
        <div>
          <label htmlFor="start-date" className="text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            name="start"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            name="end"
            value={localEndDate}
            onChange={(e) => setLocalEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        onClick={handleApply}
        disabled={isApplyDisabled}
        className="mt-4 w-full rounded-md bg-[var(--accent-primary)] py-2 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:bg-[var(--bg-muted)] disabled:text-[var(--text-muted)]"
      >
        Apply date filter
      </button>
    </div>
  );
};
