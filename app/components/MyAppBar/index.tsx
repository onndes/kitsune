import { extractCategoryPath } from '@/common/utils/extractCategoryPath';
import { getCatsAndSubs } from '@/lib/firebase/getCategories';
import React from 'react';
import MyAppBar from './MyAppBar';

const MyAppBarWraper = async () => {
  const { categories, subcategories } = await getCatsAndSubs();
  const extractedCategoryPath = extractCategoryPath(subcategories);

  return (
    <MyAppBar categories={categories} subcategories={extractedCategoryPath} />
  );
};

export default MyAppBarWraper;
