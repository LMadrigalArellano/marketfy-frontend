import { ProductsState, SelectionState, SingleProduct } from '@/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: SelectionState = {
  products: [],
  loading: true,
  error: '',
}

const fetchWishlistProducts = createAsyncThunk('user/wishlist', async (userId: string) => {
  const res = await fetch(`http://localhost:8080/marketfy/api/users/${userId}/wishlist`);
  return await res.json();
}); 

// const fetchCartProducts = createAsyncThunk('user/cart', async (userId: number) => {
//   const res = await fetch(`http://localhost:8080/marketfy/api/users/${userId}/cart`);
//   return await res.json();
// }); 

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {

    setInitialSelection(state, action: PayloadAction<ProductsState>){
      // if(action.payload.products.length > 0){
      //   state.products = action.payload.products;
      // }
    },

    // addProduct(state, action: PayloadAction<SingleProduct>){

    //   const newProduct = action.payload;
    //   const isNewProductInArray = state.products.find((productInArray => productInArray.productId === newProduct.productId)) !== undefined;

    //   if(isNewProductInArray) return;

    //   state.products.push(newProduct);

    // },

    // toggleFromWishList(state, action: PayloadAction<SingleProduct>){

    //   const product = action.payload;
    //   const productIndex = state.products.map(x => x.id).indexOf(product.id);

    //   state.products[productIndex].inWishList = !state.products[productIndex].inWishList;
      
    // }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWishlistProducts.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    });
    builder.addCase(fetchWishlistProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message!;
    });

    ////////////////////////////////////////////////////////////

    // builder.addCase(fetchCartProducts.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(fetchCartProducts.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.products = action.payload;
    //   state.error = '';
    // });
    // builder.addCase(fetchCartProducts.rejected, (state, action) => {
    //   state.loading = false;
    //   state.products = [];
    //   state.error = action.error.message!;
    // });
  }
});

export { 
  // fetchCartProducts, 
  fetchWishlistProducts };

export const { 
  setInitialSelection, 
  // addProduct, toggleFromWishList 
} = selectionSlice.actions;


export default selectionSlice.reducer;