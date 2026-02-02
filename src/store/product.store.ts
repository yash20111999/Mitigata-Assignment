import { create } from "zustand";
import type { Product } from "../types/product";
import type { FilterState } from "../types/filters";
import type { SortOption } from "../types/sort";

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
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  clearFilters: () => void;
  setSort: (sort: SortOption) => void;
  toggleCompare: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

const initialFilterState: FilterState = {
  search: "",
  categories: [],
  priceRange: [0, 2000],
  minRating: 0,
  stockStatus: [],
  brands: [],
};

export const useProductStore = create<ProductState & ProductActions>((set) => ({
  products: [],
  loading: false,
  error: null,
  filters: initialFilterState,
  sort: "rating-desc",
  compareIds: [],
  favorites: [],

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  clearFilters: () => set({ filters: { ...initialFilterState } }),
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
      return { compareIds };
    }),
  toggleFavorite: (id) =>
    set((state) => {
      const { favorites } = state;
      if (favorites.includes(id)) {
        return { favorites: favorites.filter((favId) => favId !== id) };
      }
      return { favorites: [...favorites, id] };
    }),
}));
