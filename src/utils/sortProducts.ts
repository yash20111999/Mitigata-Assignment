import type { Product } from '../types/product';
import type { SortOption } from '../types/sort';

export const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const sortedProducts = [...products]; // Create a shallow copy to avoid mutation

  switch (sort) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'rating-asc':
      return sortedProducts.sort((a, b) => a.rating - b.rating);
    case 'rating-desc':
      return sortedProducts.sort((a, b) => b.rating - a.rating);
    case 'title-asc':
      return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sortedProducts; // Return original array if sort option is not recognized
  }
};
