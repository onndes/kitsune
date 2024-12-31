import React from 'react';
import Product from './Product';
import { getProductByCode } from '@/lib/firebase/getProducts';

interface Props {
  params: {
    categorySlug: string;
    subcategorySlug: string;
    productSlug: string;
  };
}

const ProductPage: React.FC<Props> = async ({ params }) => {
  const { productSlug } = await params;
  const productData = await getProductByCode(Number(productSlug));

  if (!productData || !productData.productsImgSplash)
    return <div>Product not found</div>;

  return <Product product={productData.productsImgSplash} />;
};

export default ProductPage;
