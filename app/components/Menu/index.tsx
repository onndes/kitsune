import React from 'react';
import MyMenu from './MyMenu';
import { getCatsAndSubs } from '@/lib/firebase/getCategories';
import { ISubCategory, ISubCategoryWithPath } from '@/types/products.types';

const extractCategoryPath = (
  subcategories: ISubCategory[]
): ISubCategoryWithPath[] => {
  return subcategories.map((subc) => ({
    ...subc,
    category: subc.category.path,
  }));
};

const ServerWrapperMyMenu = async () => {
  const { categories, subcategories } = await getCatsAndSubs();
  const extractedCategoryPath = extractCategoryPath(subcategories);

  return (
    <MyMenu
      categories={categories}
      subcategories={extractedCategoryPath}
      homePage={false}
    />
  );
};

export default ServerWrapperMyMenu;
