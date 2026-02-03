import React from 'react';
import { useProductStore } from '../../store/product.store';

interface CompareButtonProps {
  onOpenCompareDrawer: () => void;
}

export const CompareButton: React.FC<CompareButtonProps> = ({ onOpenCompareDrawer }) => {
  const compareIds = useProductStore((state) => state.compareIds);

  if (compareIds.length === 0) {
    return null;
  }

  return (
    <button onClick={onOpenCompareDrawer} className="flex-shrink-0 rounded-md px-2 py-1 font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">
      <span className="hidden sm:inline">Compare </span>({compareIds.length}/3)
    </button>
  );
};
