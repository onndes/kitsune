import {
  extractCategoryAndSubcategoryPaths,
  extractCategoryAndSubcategoryPathsAndPlaceholder,
} from '@/common/utils/extractCategoryPath';
import { db } from '@/firebase';
import { defaultCountsLoading, EnumFirestoreCollections } from '@/types/enums';
import {
  IGetProductsParams,
  IProduct,
  IProductWithDocRef,
  NonLastProductId,
  TLastProductId,
} from '@/types/products.t';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

export const getProductByCode = async (
  code: number
): Promise<{
  product: IProductWithDocRef;
  productsImgSplash: IProduct;
  productWithRef: IProduct;
} | null> => {
  try {
    const docRef = doc(db, EnumFirestoreCollections.PRODUCTS, `${code}`);
    const docSnap = await getDoc(docRef);
    const product: IProductWithDocRef | null = docSnap.exists()
      ? (docSnap.data() as IProductWithDocRef)
      : null;
    if (!product) throw new Error("Product doesn't exist");
    const productWithRef = extractCategoryAndSubcategoryPaths([product])[0];

    const productsImgSplash: IProduct =
      extractCategoryAndSubcategoryPathsAndPlaceholder([productWithRef])[0];

    return { product, productsImgSplash, productWithRef };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getProducts = async (
  params: IGetProductsParams
): Promise<{
  productsWithSnapshot: IProductWithDocRef[];
  lastProductId: TLastProductId;
  products: IProduct[];
  productsImgSplash: IProduct[];
}> => {
  try {
    const {
      category,
      subcategory,
      limitNumber = defaultCountsLoading,
      lastDocId,
    } = params;
    const productsRef = collection(db, EnumFirestoreCollections.PRODUCTS);

    let productQuery = query(
      productsRef,
      orderBy('__name__'),
      limit(limitNumber)
    );
    // Ссылки на подкатегорию и категорию
    const subReg =
      subcategory &&
      doc(db, EnumFirestoreCollections.SUBCATEGORIES, subcategory);

    const catReg =
      category && doc(db, EnumFirestoreCollections.CATEGORIES, category);

    // Фильтрация по категории или подкатегории
    if (subcategory) {
      productQuery = query(
        productQuery,
        where(EnumFirestoreCollections.SUBCATEGORY, '==', subReg)
      );
    }
    if (category) {
      productQuery = query(
        productQuery,
        where(EnumFirestoreCollections.CATEGORY, '==', catReg)
      );
    }

    // Дозагрузка данных, если указан lastDoc
    if (lastDocId) {
      productQuery = query(productQuery, startAfter(lastDocId));
    }

    // Выполнение запроса
    const querySnapshot = await getDocs(productQuery);

    // Преобразование данных
    const productsWithSnapshot: IProductWithDocRef[] = querySnapshot.docs.map(
      (doc) => doc.data() as IProductWithDocRef
    );

    const lastProductId =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1].id
        : NonLastProductId;

    const products: IProduct[] =
      extractCategoryAndSubcategoryPaths(productsWithSnapshot);

    const productsImgSplash: IProduct[] =
      extractCategoryAndSubcategoryPathsAndPlaceholder(products);

    return { products, productsWithSnapshot, lastProductId, productsImgSplash };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
