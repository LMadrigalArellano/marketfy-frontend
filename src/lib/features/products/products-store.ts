import { ProductsState, SingleProduct } from '@/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: '',
}
const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
  return fetch(`http://localhost:8080/marketfy/api/products`)
  .then(res => res.json());
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

    setInitialProducts(state, action: PayloadAction<ProductsState>){
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
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message!;
    });
  }
});

export { fetchProducts };

export const { 
  setInitialProducts, 
  // addProduct, toggleFromWishList 
} = productsSlice.actions;


export default productsSlice.reducer;