import { useEffect } from 'react';
import { useProductStore } from '../store/product.store';
import { fetchProducts } from '../utils/api';

export const useProducts = () => {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const setLoading = useProductStore((state) => state.setLoading);
  const setError = useProductStore((state) => state.setError);

  useEffect(() => {
    const loadProducts = async () => {
      if (products.length > 0) {
        return;
      }
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setError(null);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [products.length, setProducts, setLoading, setError]);
};
