import React from 'react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onChange: (mode: 'grid' | 'list') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onChange }) => {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <button onClick={() => onChange('grid')} className={`rounded-md px-2 py-1 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${viewMode === 'grid' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'}`}>Grid</button>
      <button onClick={() => onChange('list')} className={`rounded-md px-2 py-1 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${viewMode === 'list' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'}`}>List</button>
    </div>
  );
};
