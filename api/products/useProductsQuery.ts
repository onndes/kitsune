import { getProducts } from '@/api/products/getProducts';
import { IProduct, TLastProductId } from '@/api/products/products.types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useProductsQuery = (
  category?: string,
  subcategory?: string,
  initialLastProductId?: TLastProductId,
  initialProducts: IProduct[] = []
) => {
  return useInfiniteQuery({
    queryKey: ['products', category, subcategory],
    queryFn: async ({ pageParam = null }) => {
      const { productsImgSplash, lastProductId } = await getProducts({
        category,
        subcategory,
        lastDocId: pageParam,
      });
      return { products: productsImgSplash, nextPage: lastProductId };
    },
    initialPageParam: initialLastProductId,
    getNextPageParam: (lastPage) =>
      lastPage.products.length === 0 ? undefined : lastPage.nextPage,
    refetchOnWindowFocus: false,
    initialData: {
      pages: [{ products: initialProducts, nextPage: initialLastProductId }],
      pageParams: [initialLastProductId],
    },
  });
};
