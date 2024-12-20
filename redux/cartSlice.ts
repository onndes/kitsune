// cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  code: string;
  name: string;
  price: number;
  count: number;
}

export interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: JSON.parse(
    window.localStorage.getItem('cartProducts') || '[]'
  ) as Product[],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetState: () => initialState,
    addProduct(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingProduct = state.products.find(
        (el) => el.code === product.code
      );

      if (existingProduct) {
        const updatedProducts = state.products.map((el) =>
          el.code === product.code ? { ...el, count: el.count + 1 } : el
        );
        window.localStorage.setItem(
          'cartProducts',
          JSON.stringify(updatedProducts)
        );
        state.products = updatedProducts;
      } else {
        const updatedProducts = [...state.products, { ...product, count: 1 }];
        window.localStorage.setItem(
          'cartProducts',
          JSON.stringify(updatedProducts)
        );
        state.products = updatedProducts;
      }
    },
    removeProduct(
      state,
      action: PayloadAction<{ product: Product; remove?: boolean }>
    ) {
      const { product, remove } = action.payload;
      const existingProduct = state.products.find(
        (el) => el.code === product.code
      );

      if (existingProduct) {
        if (existingProduct.count > 1 && !remove) {
          const updatedProducts = state.products.map((el) =>
            el.code === product.code ? { ...el, count: el.count - 1 } : el
          );
          window.localStorage.setItem(
            'cartProducts',
            JSON.stringify(updatedProducts)
          );
          state.products = updatedProducts;
        } else {
          const updatedProducts = state.products.filter(
            (el) => el.code !== product.code
          );
          window.localStorage.setItem(
            'cartProducts',
            JSON.stringify(updatedProducts)
          );
          state.products = updatedProducts;
        }
      }
    },
  },
});

export const { resetState, addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
