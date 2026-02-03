import { create } from 'zustand';
import type { Product } from '../types/product';
import type { FilterState } from '../types/filters';
import type { SortOption } from '../types/sort';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  sort: SortOption;
  compareIds: number[];
  favorites: number[];
}

interface ProductActions {
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  setSort: (sort: SortOption) => void;
  toggleCompare: (id: number) => void;
  toggleFavorite: (id: number) => void;
  setFavorites: (favorites: number[]) => void;
  rehydrateFavorites: () => void;
}

const initialFilterState: FilterState = {
  search: '',
  categories: [],
  priceRange: [0, 2000],
  minRating: 0,
  stockStatus: [],
  brands: [],
  favoritesOnly: false,
};

export const useProductStore = create<ProductState & ProductActions>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filters: initialFilterState,
  sort: 'rating-desc',
  compareIds: [],
  favorites: [],

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  clearFilters: () => set({ filters: initialFilterState }),
  setSort: (sort) => set({ sort }),
  toggleCompare: (id) =>
    set((state) => {
      const { compareIds } = state;
      if (compareIds.includes(id)) {
        return { compareIds: compareIds.filter((compId) => compId !== id) };
      }
      if (compareIds.length < 3) {
        return { compareIds: [...compareIds, id] };
      }
      // Show alert or notification in a real app
      console.warn('Cannot compare more than 3 products.');
      return {};
    }),
  setFavorites: (favorites) => set({ favorites }),
  rehydrateFavorites: () => {
    try {
      const persistedFavorites = localStorage.getItem('favorites');
      if (persistedFavorites) {
        set({ favorites: JSON.parse(persistedFavorites) });
      }
    } catch (error) {
      console.error('Failed to rehydrate favorites from localStorage', error);
    }
  },
  toggleFavorite: (id) => {
    const { favorites } = get();
    const isFavorite = favorites.includes(id);
    const newFavorites = isFavorite
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    
    // Optimistic UI update
    set({ favorites: newFavorites });

    try {
      // Attempt to persist to localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorites to localStorage, rolling back.', error);
      // Rollback on failure
      set({ favorites });
    }
  },
}));