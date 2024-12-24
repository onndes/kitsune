import WrapperProducts from '../../WrapperProducts';

export default async function SubcategoryPage({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const { categorySlug, subcategorySlug } = await params;

  return (
    <WrapperProducts
      category={decodeURIComponent(categorySlug)}
      subcategory={decodeURIComponent(subcategorySlug)}
    />
  );
}
