import { CartProduct, CartState } from '@/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CartState = {
  "cart": [
  ],
  "totalItems": 0,
  "summaryInformation": {
    "productsAmount": 0,
    "subTotal": 0,
    "taxes": 0,
    "total": 0
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    setInitialProductsInCart(state, action: PayloadAction<CartState>){
      if(action.payload.cart.length > 0){
        state.cart = action.payload.cart;
      }
    },

    calculateTotalItems(state){
      state.totalItems = state.cart.reduce((total, item) => total += item.quantity, 0 );
    },

    setSummaryInformation: (state) => {

      const subTotal = state.cart.reduce(
        (subTotal, product) => (product.quantity * product.price) + subTotal,
        0
      );

      const taxes = subTotal * 0.16;
      const total = subTotal + taxes;
      
      state.summaryInformation = {
        productsAmount: state.totalItems,
        subTotal,
        taxes,
        total,
      }
    },

    addProductToCart(state, action: PayloadAction<CartProduct>){
      const newProduct = action.payload;
      const indexOfProductInCart = state.cart.map(x => x.productId).indexOf(newProduct.productId);

      if( indexOfProductInCart !== -1){
        state.cart[indexOfProductInCart].quantity += newProduct.quantity;
        return;
      }
      state.cart.push(newProduct);
    },

    // updateProductQuantity(state, quantity) {
    //   console.log(quantity);
    //   state.cart.map((cartItem) => console.log(cartItem));
    // },

    removeProduct(state, action: PayloadAction<CartProduct>) {
      state.cart = state.cart.filter((product) => product.productId !== action.payload.productId );
    },

    clearCart(state) {
      state.cart = [];
    }
  }
});

export const { 
  setInitialProductsInCart, 
  addProductToCart, 
  removeProduct, 
  calculateTotalItems,
  setSummaryInformation,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer