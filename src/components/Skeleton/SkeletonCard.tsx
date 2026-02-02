import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="bg-[var(--bg-surface)] p-4 rounded-lg border border-[var(--border-default)]">
    <div className="w-full aspect-square bg-[var(--bg-muted)] rounded-md mb-4"></div>
    <div className="h-5 bg-[var(--bg-muted)] rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-[var(--bg-muted)] rounded w-1/2 mb-4"></div>
    <div className="flex justify-between items-center">
      <div className="h-7 bg-[var(--bg-muted)] rounded w-1/3"></div>
      <div className="h-5 bg-[var(--bg-muted)] rounded w-1/4"></div>
    </div>
  </div>
);
