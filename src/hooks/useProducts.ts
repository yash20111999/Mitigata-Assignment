import { useEffect } from 'react';
import { useProductStore } from '../store/product.store';
import { fetchProducts } from '../utils/api';

export const useProducts = () => {
  // This hook's only purpose is to trigger the product fetch on mount.
  // It doesn't need to return anything or subscribe to state changes here.
  useEffect(() => {
    const loadProducts = async () => {
      // Use getState to prevent re-running on state changes.
      if (useProductStore.getState().products.length > 0) {
        return;
      }
      const { setLoading, setProducts, setError } = useProductStore.getState();
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setError(null);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An unknown error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
};