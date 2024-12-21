import { ISubCategory, ISubCategoryWithPath } from '@/types/products.types';

export const extractCategoryPath = (
  subcategories: ISubCategory[]
): ISubCategoryWithPath[] => {
  return subcategories.map((subc) => ({
    ...subc,
    category: subc.category.path,
  }));
};
