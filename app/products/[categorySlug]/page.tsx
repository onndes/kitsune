import { getProducts } from '@/lib/firebase/getProducts';
import Products from '../Products';
import { extractCategoryAndSubcategoryPaths } from '@/common/utils/extractCategoryPath';

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const { categorySlug } = await params;
  const { products } = await getProducts({
    category: decodeURIComponent(categorySlug),
    limitNumber: 10,
  });

  const productsWithPaths = extractCategoryAndSubcategoryPaths(products);

  return <Products products={productsWithPaths} />;
}
