import Products from '../Products';

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const { categorySlug } = await params;
  return <Products category={decodeURIComponent(categorySlug)} />;
}
