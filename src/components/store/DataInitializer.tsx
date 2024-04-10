'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { loadState } from '@/utils/localStorage';
import { setLoggedUser } from '@/lib/features/users/users-store';
import { ProductsState, SelectionState, SingleProduct } from '@/interfaces';
import { fetchSelectionProducts, fetchWishlistProducts, setInitialSelection } from '@/lib/features/selection/selection-store';
import { calculateTotalItems, setInitialProductsInCart, setSummaryInformation } from '@/lib/features/cart/cart-store';

export const DataInitializer = () => {
	const dispatch = useAppDispatch();
	const [persistedState] = useState(loadState());
	const usersState = useAppSelector(state => state.users);
	const selectionState: SelectionState = useAppSelector(state => state.selection);
	
	useEffect(() => {
		dispatch(setInitialProductsInCart(persistedState.cart));
		dispatch(calculateTotalItems() );
		dispatch(setSummaryInformation() );
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
	
	return (
		<></>
	);
}
