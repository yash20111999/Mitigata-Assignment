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

export const filterProducts = (products: Product[], filters: FilterState, favorites: number[]): Product[] => {
  const { search, categories, priceRange, minRating, stockStatus, brands, favoritesOnly, reviewDateRange } = filters;
  const lowerCaseSearch = search.toLowerCase();

  const startDate = reviewDateRange?.start ? new Date(reviewDateRange.start).getTime() : null;
  const endDate = reviewDateRange?.end ? new Date(reviewDateRange.end).getTime() : null;


  return products.filter((product) => {
    if (favoritesOnly && !favorites.includes(product.id)) {
        return false;
    }
    
    if (reviewDateRange && (startDate || endDate)) {
      if (!product.reviews || product.reviews.length === 0) {
        return false;
      }

      const hasReviewInDateRange = product.reviews.some((review) => {
        try {
          const reviewDate = new Date(review.date).getTime();
          if (startDate && endDate) {
            return reviewDate >= startDate && reviewDate <= endDate;
          }
          if (startDate) {
            return reviewDate >= startDate;
          }
          if (endDate) {
            return reviewDate <= endDate;
          }
        } catch (error) {
            console.error(`Invalid date format for review:`, { review, error });
            return false;
        }
        return false;
      });

      if (!hasReviewInDateRange) {
        return false;
      }
    }

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
