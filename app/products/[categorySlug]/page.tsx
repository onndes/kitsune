import WrapperProducts from '../WrapperProducts';

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const { categorySlug } = await params;
  return <WrapperProducts category={decodeURIComponent(categorySlug)} />;
}
