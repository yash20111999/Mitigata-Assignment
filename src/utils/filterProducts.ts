import type { Product } from '../types/product';
import type { FilterState, StockStatus } from '../types/filters';

const checkStockStatus = (stock: number, selectedStatuses: StockStatus[]): boolean => {
  if (selectedStatuses.length === 0) {
    return true;
  }
  return selectedStatuses.some(status => {
    if (status === 'in-stock') return stock > 20;
    if (status === 'low-stock') return stock > 0 && stock <= 20;
    if (status === 'out-of-stock') return stock === 0;
    return false;
  });
};

export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  const { search, categories, priceRange, minRating, stockStatus, brands } = filters;
  const lowerCaseSearch = search.trim().toLowerCase();

  return products.filter((product) => {
    if (
      lowerCaseSearch &&
      !product.title.toLowerCase().includes(lowerCaseSearch) &&
      !product.description.toLowerCase().includes(lowerCaseSearch)
    ) {
      return false;
    }

    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }

    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    if (product.rating < minRating) {
      return false;
    }
    
    if (brands.length > 0 && !brands.includes(product.brand)) {
        return false;
    }

    if (!checkStockStatus(product.stock, stockStatus)) {
        return false;
    }

    return true;
  });
};
