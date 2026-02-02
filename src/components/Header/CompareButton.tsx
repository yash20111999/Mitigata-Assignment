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
    <button onClick={onOpenCompareDrawer} className="hidden sm:block font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)]">
      Compare ({compareIds.length}/3)
    </button>
  );
};
