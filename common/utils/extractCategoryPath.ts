import {
  IOneProduct,
  ISubCategory,
  ISubCategoryWithPath,
} from '@/types/products.types';

export interface IProductWithPaths {
  category: string;
  subcategory?: string; // Если subcategory существует
  [key: string]: any;
}

export const extractCategoryPath = (
  subcategories: ISubCategory[]
): ISubCategoryWithPath[] => {
  return subcategories.map((subc) => ({
    ...subc,
    category: subc.category.path,
  }));
};

export const extractCategoryAndSubcategoryPaths = (
  products: IOneProduct[]
): IProductWithPaths[] => {
  return products.map((product) => ({
    ...product,
    category: product.category.path,
    subcategory: product.subcategory?.path, // Проверяем наличие subcategory
  }));
};
