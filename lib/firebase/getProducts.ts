import { db } from '@/firebase';
import { EnumFirestoreCollections } from '@/types/enums';
import { IGetProductsParams, IOneProduct } from '@/types/products.types';
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
): Promise<IOneProduct | null> => {
  try {
    const docRef = doc(db, EnumFirestoreCollections.PRODUCTS, `${code}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as IOneProduct) : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getProducts = async (
  params: IGetProductsParams
): Promise<{
  products: IOneProduct[];
  lastVisible: DocumentSnapshot | null;
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
    console.log('getProducts', category, subcategory, limitNumber);
    const querySnapshot = await getDocs(productQuery);
    console.log('getProducts - querySnapshot', querySnapshot);
    const products: IOneProduct[] = querySnapshot.docs.map(
      (doc) => doc.data() as IOneProduct
    );
    console.log('getProducts - products', products);
    const lastVisible =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

    return { products, lastVisible };
  } catch (error) {
    console.error('Error fetching products:', error); // Логируем ошибку
    throw new Error('Failed to fetch products'); // Выбрасываем ошибку
  }
};
