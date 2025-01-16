import { IProduct, NonLastProductId, TLastProductId } from '@/types/products.t';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: IProduct[];
  lastDoc: TLastProductId;
  limitGetProduct: number;
}

const initialState: ProductState = {
  products: [],
  lastDoc: NonLastProductId,
  limitGetProduct: 16,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetState: () => initialState,
    setProducts(state, action: PayloadAction<IProduct[]>) {
      // const newProducts = action.payload.filter(
      //   (newProduct) =>
      //     !state.products.some(
      //       (existingProduct) => existingProduct.code === newProduct.code
      //     )
      // );
      state.products = [...state.products, ...action.payload];
      // state.products = [...state.products, ...action.payload];
    },
    setInitialProducts(state, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setLastDoc(state, action: PayloadAction<TLastProductId>) {
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
