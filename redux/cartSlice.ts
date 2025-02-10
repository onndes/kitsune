// cartSlice.ts
import { IProduct } from '@/api/products/products.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  products: IProduct[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetState: () => initialState,
    addProduct(state, action: PayloadAction<IProduct>) {
      const product = action.payload;
      const existingProduct = state.products.find(
        (el) => el.code === product.code
      );

      const updatedProducts = existingProduct
        ? state.products.map((el) =>
            el.code === product.code ? { ...el, count: el.count + 1 } : el
          )
        : [...state.products, { ...product, count: 1 }];

      state.products = updatedProducts;
    },
    removeProduct(
      state,
      action: PayloadAction<{ product: IProduct; remove?: boolean }>
    ) {
      const { product, remove } = action.payload;
      const existingProduct = state.products.find(
        (el) => el.code === product.code
      );

      if (existingProduct) {
        const updatedProducts =
          existingProduct.count > 1 && !remove
            ? state.products.map((el) =>
                el.code === product.code ? { ...el, count: el.count - 1 } : el
              )
            : state.products.filter((el) => el.code !== product.code);

        state.products = updatedProducts;
      }
    },
  },
});

export const { resetState, addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
