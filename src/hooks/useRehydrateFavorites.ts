import { useEffect } from 'react';
import { useProductStore } from '../store/product.store';

/**
 * A hook to rehydrate the favorites from localStorage on initial app load.
 * This should be used once in a top-level component.
 */
export const useRehydrateFavorites = () => {
  const rehydrateFavorites = useProductStore((state) => state.rehydrateFavorites);

  useEffect(() => {
    rehydrateFavorites();
  }, []);
};
