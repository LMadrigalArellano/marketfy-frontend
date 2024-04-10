import { SelectionRecord, SelectionState, SingleProduct } from '@/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: SelectionState = {
  products: [],
  cart: [],
  wishlist: [],
  loading: true,
  error: '',

}

const fetchSelectionProducts = createAsyncThunk('user/selection', async (userId: string) => {
  const res = await fetch(`http://localhost:8080/marketfy/api/users/${userId}/wishlist`);
  return await res.json();
}); 

const fetchWishlistProducts = createAsyncThunk('user/wishlist', async (selectedProducts:SelectionRecord[]) => {
  const productIds = selectedProducts.map((product) => product.productId+"");
  const res = await fetch(`http://localhost:8080/marketfy/api/products/wishlist`,
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      productIds
    }),
  }
  );
  return await res.json();
});

// const fetchWishlistProducts = createAsyncThunk('user/wishlist', async (selectedProducts:SelectionRecord[]) => {

//   let newProducts: SingleProduct[] = [];
  
//   try{
//     selectedProducts.map(async (product) => {
//       const fetchedProduct = await fetch(`http://localhost:8080/marketfy/api/products/${product.productId}`);
//       const newProduct:SingleProduct = await fetchedProduct.json();
//       newProducts = ([...newProducts, newProduct]);
//     });
  
//     return newProducts;

//   } catch(e) {
//     return [];
//   }

// }); 

// const fetchCartProducts = createAsyncThunk('user/cart', async (userId: number) => {
//   const res = await fetch(`http://localhost:8080/marketfy/api/users/${userId}/cart`);
//   return await res.json();
// }); 

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {

    setInitialSelection(state, action: PayloadAction<{wishlistItems:SingleProduct[]}>){
      if(action.payload){
        state.wishlist = action.payload.wishlistItems;
      }
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
    builder.addCase(fetchSelectionProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSelectionProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = '';
    });
    builder.addCase(fetchSelectionProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message!;
    });

    ////////////////////////////////////////////////////////////

    builder.addCase(fetchWishlistProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWishlistProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlist = action.payload;
      state.error = '';

    });
    builder.addCase(fetchWishlistProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message!;
    });
  }
});

export { 
  // fetchCartProducts, 
  fetchSelectionProducts,
  fetchWishlistProducts 
};

export const { 
  setInitialSelection, 
  // addProduct, toggleFromWishList 
} = selectionSlice.actions;


export default selectionSlice.reducer;