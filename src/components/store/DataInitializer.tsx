'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { loadState } from '@/utils/localStorage';
import { setLoggedUser } from '@/lib/features/users/users-store';
import { OrdersState, ProductsState, SelectionState, SingleProduct } from '@/interfaces';
import { fetchSelectionProducts, fetchWishlistProducts, setInitialSelection } from '@/lib/features/selection/selection-store';
import { calculateTotalItems, setInitialProductsInCart, setSummaryInformation } from '@/lib/features/cart/cart-store';
import { fetchUserOrderRecords } from '@/lib/features/orders/orders.store';

export const DataInitializer = () => {
	const dispatch = useAppDispatch();
	const [persistedState] = useState(loadState());

	const usersState = useAppSelector(state => state.users);
	const selectionState: SelectionState = useAppSelector(state => state.selection);
	const ordersState: OrdersState = useAppSelector(state => state.orders);

	useEffect(() => {
		dispatch(setInitialProductsInCart(persistedState.cart));
		dispatch(calculateTotalItems());
		dispatch(setSummaryInformation());
		dispatch(setLoggedUser(persistedState.users));
  }, []);

	useEffect(() => {
    if(usersState.loggedUser){
      dispatch(fetchSelectionProducts(usersState.loggedUser.userId));
    }
  },[usersState]);

	useEffect(() => {
    if(usersState.loggedUser){
      dispatch(fetchWishlistProducts(selectionState.products));
    }
  },[selectionState.products]);

	useEffect(() => {
    if(usersState.loggedUser){
      dispatch(fetchUserOrderRecords(parseInt(usersState.loggedUser.userId)));
    }
  },[usersState]);
	
	return (
		<></>
	);
}
