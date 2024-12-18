import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  limit,
  startAfter,
  getDoc,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/firebase';
import { AsyncThunkOptions } from '@/types/createAsyncThunk';
import { CATEGORIES, SUBCATEGORIES } from '@/common/consts';
// Типы для параметров
interface GetProductParams {
  code: string;
}

interface GetProductsParams {
  category?: string;
  subcategory?: string;
}

// Типы для данных продуктов
interface Product {
  name: string;
  price: number;
  // добавьте другие поля, соответствующие вашей модели данных
}

console.warn('FIXME: проверь тип!');
interface GetProductsResponse {
  products: Product[];
  lastVisible: DocumentSnapshot[]; // Это будет последний видимый документ (типизированный как DocumentSnapshot)
}

export const getProduct = createAsyncThunk<
  { product: Product },
  AsyncThunkOptions
>('product/getProduct', async (data: GetProductParams, { rejectWithValue }) => {
  try {
    const docRef = doc(db, 'products', `${data.code}`);
    const docSnap = await getDoc(docRef);
    return { product: docSnap.data() } as { product: Product };
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const getProducts = createAsyncThunk<
  GetProductsResponse,
  GetProductsParams,
  AsyncThunkOptions
>('product/getProducts', async (data, { rejectWithValue, getState }) => {
  try {
    const { limitGetProduct } = getState().product;
    const { category, subcategory } = data;
    const productsRef = collection(db, 'products');

    const subReg = subcategory && doc(db, SUBCATEGORIES, subcategory);
    const catReg = category && doc(db, CATEGORIES, category);

    let q = query(productsRef, limit(limitGetProduct));

    if (subcategory) {
      q = query(
        productsRef,
        where('subcategory', '==', subReg),
        limit(limitGetProduct)
      );
    } else if (category) {
      q = query(
        productsRef,
        where('category', '==', catReg),
        limit(limitGetProduct)
      );
    }

    const docSnapshot = await getDocs(q);
    const lastVisible = docSnapshot.docs[docSnapshot.docs.length - 1];

    const products: Product[] = [];
    docSnapshot?.forEach((doc) => products.push(doc.data() as Product));

    return { products, lastVisible };
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const addedProducts = createAsyncThunk<
  GetProductsResponse,
  GetProductsParams,
  AsyncThunkOptions
>('product/addedProducts', async (data, { rejectWithValue, getState }) => {
  try {
    const { limitGetProduct } = getState().product;
    const { category, subcategory } = data;
    const productsRef = collection(db, 'products');

    const subReg = subcategory && doc(db, SUBCATEGORIES, subcategory);
    const catReg = category && doc(db, CATEGORIES, category);
    const { lastVisibleProduct } = getState().product;

    let q = query(
      productsRef,
      startAfter(lastVisibleProduct),
      limit(limitGetProduct)
    );

    if (subcategory) {
      q = query(
        productsRef,
        where('subcategory', '==', subReg),
        startAfter(lastVisibleProduct),
        limit(limitGetProduct)
      );
    } else if (category) {
      q = query(
        productsRef,
        where('category', '==', catReg),
        startAfter(lastVisibleProduct),
        limit(limitGetProduct)
      );
    }

    const docSnapshot = await getDocs(q);
    const lastVisible = docSnapshot.docs[docSnapshot.docs.length - 1];

    const products: Product[] = [];
    docSnapshot?.forEach((doc) => products.push(doc.data() as Product));

    return { products, lastVisible };
  } catch (e) {
    return rejectWithValue(e);
  }
});
