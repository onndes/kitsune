import { getProducts } from '@/lib/firebase/getProducts';
import Products from './Products';
import { extractCategoryAndSubcategoryPaths } from '@/common/utils/extractCategoryPath';

export default async function ProductsPage() {
  try {
    const { products } = await getProducts({ limitNumber: 10 });
    const productsWithPaths = extractCategoryAndSubcategoryPaths(products);
    console.log(products);
    // return null;
    return <Products products={productsWithPaths} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products</div>;
  }
}
