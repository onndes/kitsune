import {
  IProduct,
  IProductWithDocRef,
  ISubCategory,
  ISubCategoryWithPath,
} from '@/types/products.types';

export const extractCategoryPath = (
  subcategories: ISubCategory[]
): ISubCategoryWithPath[] => {
  return subcategories.map((subc) => ({
    ...subc,
    category: subc.category.path,
  }));
};

export const extractCategoryAndSubcategoryPaths = (
  products: IProductWithDocRef[]
): IProduct[] => {
  return products.map((product) => ({
    ...product,
    category: product.category.path,
    subcategory: product.subcategory?.path,
  }));
};

export const extractCategoryAndSubcategoryPathsAndPlaceholder = (
  products: IProduct[]
): IProduct[] => {
  return products.map((el) => {
    return {
      ...el,
      image: ['https://dummyimage.com/400x400/cccccc/000000&text=No+Image'],
    };
  });
};
