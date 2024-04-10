'use client';

import { SelectionState } from '@/interfaces';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { ProductGrid } from '..';
import { useEffect, useState } from 'react';
import { fetchWishlistProducts } from '@/lib/features/selection/selection-store';

export const WishList = () => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);

  const usersState = useAppSelector(state => state.users);
  const selectionState: SelectionState = useAppSelector(state => state.selection);

  useEffect(() => {
    if(usersState.loggedUser){
      dispatch(fetchWishlistProducts(selectionState.products));
    }
  },[usersState]);


  useEffect(() => {
    setLoaded(true);
  },[]);

  

  if(!loaded || selectionState.loading) return <p>Loading...</p>  
  
  const productsState = {
    products: selectionState.wishlist,
    loading: selectionState.loading,
    error: '',
    elementsPerPage: selectionState.wishlist.length,
    totalPages: 1,
    totalElements: selectionState.wishlist.length
  }

  return (
    <>
      <ProductGrid productsState={productsState}/>
    </>
  )
}
