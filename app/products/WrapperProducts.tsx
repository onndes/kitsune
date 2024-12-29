import { getProducts } from '@/lib/firebase/getProducts';
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
  const { productsImgSplash, lastVisible } = await getProducts({
    category,
    subcategory,
  });

  return (
    <Products
      initialProducts={productsImgSplash}
      initialLastDoc={lastVisible}
      category={category}
      subcategory={subcategory}
      handleNextProduct={handleNextProduct}
    />
  );
}
