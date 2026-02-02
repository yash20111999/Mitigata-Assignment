export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface FilterState {
  search: string;
  categories: string[];
  priceRange: [number, number];
  minRating: number;
  stockStatus: StockStatus[];
  brands: string[];
}
