import React from 'react';
import { SkeletonCard } from './SkeletonCard';

const SKELETON_COUNT = 20;

export const SkeletonGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
