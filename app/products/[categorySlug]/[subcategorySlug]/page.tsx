import { getProducts } from '@/lib/firebase/getProducts';
import Products from '../../Products';
import { extractCategoryAndSubcategoryPaths } from '@/common/utils/extractCategoryPath';

export default async function SubcategoryPage({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const { categorySlug, subcategorySlug } = await params;
  console.log(categorySlug, subcategorySlug);
  const { products } = await getProducts({
    category: decodeURIComponent(categorySlug),
    subcategory: decodeURIComponent(subcategorySlug),
    limitNumber: 10,
  });
  const productsWithPaths = extractCategoryAndSubcategoryPaths(products);

  return <Products products={productsWithPaths} />;
}
