// import { createSlice } from '@reduxjs/toolkit';
// // import { setStatus } from '../../../common/utils/setStatus';
// // import { addedProducts, getProduct, getProducts } from './productAsync';

// const initialState = {
//   products: [],
//   lastVisibleProduct: null,
//   status: [],
//   currentProduct: null,
//   limitGetProduct: 16,
// };

// const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     resetState: () => initialState,
//   },
//   extraReducers: (builder) => {
//     // getProduct
//     builder.addCase(getProduct.pending, (state, action) => {
//       setStatus(state, action);
//     });
//     builder.addCase(getProduct.fulfilled, (state, action) => {
//       setStatus(state, action);
//       state.currentProduct = action.payload.product;
//     });
//     builder.addCase(getProduct.rejected, (state, action) => {
//       setStatus(state, action);
//     });

//     // getProducts
//     builder.addCase(getProducts.pending, (state, action) => {
//       setStatus(state, action);
//     });
//     builder.addCase(getProducts.fulfilled, (state, action) => {
//       setStatus(state, action);
//       state.products = action.payload.products;
//       state.lastVisibleProduct = action.payload.lastVisible;
//     });
//     builder.addCase(getProducts.rejected, (state, action) => {
//       setStatus(state, action);
//     });

//     // addedProducts
//     builder.addCase(addedProducts.pending, (state, action) => {
//       setStatus(state, action);
//     });
//     builder.addCase(addedProducts.fulfilled, (state, action) => {
//       setStatus(state, action);
//       if (action.payload.products.length) {
//         state.products = [...state.products, ...action.payload.products];
//       }
//       state.lastVisibleProduct = action.payload.lastVisible;
//     });
//     builder.addCase(addedProducts.rejected, (state, action) => {
//       setStatus(state, action);
//     });
//   },
// });

// export const { resetState } = productSlice.actions;

// export default productSlice.reducer;
