import Products from '../../Products';

export default async function SubcategoryPage({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const { categorySlug, subcategorySlug } = await params;

  return (
    <Products
      category={decodeURIComponent(categorySlug)}
      subcategory={decodeURIComponent(subcategorySlug)}
    />
  );
}
