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
  const { productsImgSplash } = await getProducts({
    limitNumber: 10,
    category,
    subcategory,
  });

  return (
    <Products
      products={productsImgSplash}
      handleNextProduct={handleNextProduct}
    />
  );
}
