import { ProductsState, SingleProduct } from '@/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: '',
  elementsPerPage: 0,
  totalElements: 0,
  totalPages: 0,

}

interface fetchProps {
  pageIndex?: number;
  pageSize?: number;
}

const fetchPaginatedProducts = createAsyncThunk('products/fetchPaginatedProducts', async ({pageIndex = 0, pageSize = 9} :fetchProps ) => {
  const res = await fetch(`http://localhost:8080/marketfy/api/products?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  return await res.json();
});

const fetchProductsByTitle = createAsyncThunk('products/fetchProductsByTitle', async (title:string) => {
  const res = await fetch(`http://localhost:8080/marketfy/api/products/title/${title}`);
  return await res.json();
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
    builder.addCase(fetchPaginatedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPaginatedProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.content;
      state.elementsPerPage = action.payload.numberOfElements;
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.error = '';
      console.log(action.payload);
    });
    builder.addCase(fetchPaginatedProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message!;
    });

    ////////////////////////////////////////////////////////////

    builder.addCase(fetchProductsByTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsByTitle.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
      state.totalElements = action.payload.length;
      state.totalPages = 1;
    });
    builder.addCase(fetchProductsByTitle.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message!;
    });


  }
});

export { fetchPaginatedProducts, fetchProductsByTitle };

export const { 
  setInitialProducts, 
  // addProduct, toggleFromWishList 
} = productsSlice.actions;


export default productsSlice.reducer;