import {
  extractCategoryAndSubcategoryPaths,
  extractCategoryAndSubcategoryPathsAndPlaceholder,
} from '@/common/utils/extractCategoryPath';
import { db } from '@/firebase';
import { EnumFirestoreCollections } from '@/types/enums';
import {
  IGetProductsParams,
  IProduct,
  IProductWithDocRef,
} from '@/types/products.types';
import {
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';

export const getOneProductByCode = async (
  code: number
): Promise<IProduct | null> => {
  try {
    const docRef = doc(db, EnumFirestoreCollections.PRODUCTS, `${code}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as IProduct) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getProducts = async (
  params: IGetProductsParams
): Promise<{
  productsWithSnapshot: IProductWithDocRef[];
  lastVisible: DocumentSnapshot | null;
  products: IProduct[];
  productsImgSplash: IProduct[];
}> => {
  try {
    const { category, subcategory, limitNumber } = params;
    const productsRef = collection(db, EnumFirestoreCollections.PRODUCTS);
    let productQuery = query(productsRef, limit(limitNumber));

    const subReg =
      subcategory &&
      doc(db, EnumFirestoreCollections.SUBCATEGORIES, subcategory);
    const catReg =
      category && doc(db, EnumFirestoreCollections.CATEGORIES, category);

    if (subcategory) {
      productQuery = query(
        productQuery,
        where(EnumFirestoreCollections.SUBCATEGORY, '==', subReg)
      );
    } else if (category) {
      productQuery = query(
        productQuery,
        where(EnumFirestoreCollections.CATEGORY, '==', catReg)
      );
    }

    const querySnapshot = await getDocs(productQuery);
    const productsWithSnapshot: IProductWithDocRef[] = querySnapshot.docs.map(
      (doc) => doc.data() as IProductWithDocRef
    );
    const lastVisible =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    const products: IProduct[] =
      extractCategoryAndSubcategoryPaths(productsWithSnapshot);

    // const firstProductImageUrl = products[0].image?.[0] || '';
    // const isFirstImageValid = await checkImageLoadServer(firstProductImageUrl);

    const productsImgSplash: IProduct[] =
      extractCategoryAndSubcategoryPathsAndPlaceholder(products);

    // productsImgSplash = isFirstImageValid ? products : productsImgSplash;

    return { products, productsWithSnapshot, lastVisible, productsImgSplash };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
