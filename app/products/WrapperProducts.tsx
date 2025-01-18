import { getProducts } from '@/api/products/getProducts';
import Products from './Products';

interface Props {
  handleNextProduct?: () => void;
  category?: string;
  subcategory?: string;
}

export default async function WrapperProducts({
  handleNextProduct,
  category,
  subcategory,
}: Props) {
  const { productsImgSplash, lastProductId } = await getProducts({
    category,
    subcategory,
  });

  return (
    <Products
      initialProducts={productsImgSplash}
      initialLastProductId={lastProductId}
      category={category}
      subcategory={subcategory}
      handleNextProduct={handleNextProduct}
    />
  );
}
