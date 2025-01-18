import { extractCategoryPath } from '@/utils/extractCategoryPath';
import { getCatsAndSubs } from '@/api/categories/getCategories';
import React from 'react';
import MyAppBar from './components/MyAppBar';

const MyAppBarWrapper = async () => {
  const { categories, subcategories } = await getCatsAndSubs();
  const extractedCategoryPath = extractCategoryPath(subcategories);

  return (
    <MyAppBar categories={categories} subcategories={extractedCategoryPath} />
  );
};

export default MyAppBarWrapper;
