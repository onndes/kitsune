import { collection, getDocs } from 'firebase/firestore';
import { ICategory, ISubCategory } from '@/api/products/products.types';
import { db } from '@/firebase';
import { EnumFirestoreCollections } from '@/api/categories/enums';

// Функция для получения данных
export const getCatsAndSubs = async (): Promise<{
  categories: ICategory[];
  subcategories: ISubCategory[];
}> => {
  try {
    const [catsSnap, subsSnap] = await Promise.all([
      getDocs(collection(db, EnumFirestoreCollections.CATEGORIES)),
      getDocs(collection(db, EnumFirestoreCollections.SUBCATEGORIES)),
    ]);

    const categories: ICategory[] = catsSnap.docs.map((doc) => ({
      ...doc.data(),
    })) as ICategory[];

    const subcategories: ISubCategory[] = subsSnap.docs.map((doc) => ({
      ...doc.data(),
    })) as ISubCategory[];

    return { categories, subcategories };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to fetch data'
    );
  }
};
