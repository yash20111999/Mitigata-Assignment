import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SearchBar } from './SearchBar';
import { ViewToggle } from './ViewToggle';
import { CompareButton } from './CompareButton';
import { SortDropdown } from './SortDropdown';

interface HeaderProps {
    onToggleFilterPanel: () => void;
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    onOpenCompareDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleFilterPanel, viewMode, setViewMode, onOpenCompareDrawer }) => {
    const isTabletOrMobile = useMediaQuery('(max-width: 1023px)');

    return (
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-[var(--border-default)] bg-[var(--bg-surface)] px-4 lg:px-6">
            <div className="flex flex-1 items-center gap-2 min-w-0 md:gap-4">
                {isTabletOrMobile && (
                    <button onClick={onToggleFilterPanel} className="lg:hidden rounded-md p-1 text-[var(--text-muted)] transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </button>
                )}
                <SearchBar />
                <CompareButton onOpenCompareDrawer={onOpenCompareDrawer} />
            </div>
            <div className="flex items-center gap-4">
                <SortDropdown />
                <ViewToggle viewMode={viewMode} onChange={setViewMode} />
            </div>
        </header>
    );
};
