import type { Product } from '../types/product';

interface ProductApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://dummyjson.com/products?limit=100');

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }

  const data: ProductApiResponse = await response.json();
  
  if (!data.products) {
    throw new Error('Invalid API response structure');
  }

  return data.products;
};
