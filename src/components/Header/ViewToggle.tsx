import React from 'react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onChange: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <button onClick={() => onChange('grid')} className={`font-medium ${viewMode === 'grid' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>Grid</button>
      <button onClick={() => onChange('list')} className={`font-medium ${viewMode === 'list' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}>List</button>
    </div>
  );
};
