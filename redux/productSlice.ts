import { IProduct } from '@/types/products.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: IProduct[];
  lastDoc: string | null;
  limitGetProduct: number;
}

const initialState: ProductState = {
  products: [],
  lastDoc: null,
  limitGetProduct: 16,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetState: () => initialState,
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = [...state.products, ...action.payload];
    },
    setInitialProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setLastDoc(state, action: PayloadAction<string | null>) {
      state.lastDoc = action.payload;
    },
    clearProducts(state) {
      state.products = [];
    },
  },
});

export const {
  resetState,
  setProducts,
  setLastDoc,
  clearProducts,
  setInitialProducts,
} = productSlice.actions;

export default productSlice.reducer;
