import { configureStore } from '@reduxjs/toolkit'

import sideMenuReducer from './features/ui/sideMenuSlice';
import productsReducer from './features/products/products-store';
// import cartReducer from './cart/cart-store';
// import ordersReducer from './orders/orders.store';
import usersReducer from './features/users/users-store';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { saveState } from '@/utils/localStorage';

export const store = configureStore({
  reducer: {
    sideMenu: sideMenuReducer,
    products: productsReducer,
    // cart: cartReducer,
    // orders: ordersReducer,
    users: usersReducer,
  },
});

// store.subscribe(() => {
//   saveState({
//     products: store.getState().products,
//     cart: store.getState().cart,
//     orders: store.getState().orders,
//     users: store.getState().users,
//   });
// });


// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;