'use client';

import { SelectionState, SingleProduct } from '@/interfaces';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import { ProductGrid } from '..';
import { useEffect, useState } from 'react';
import { fetchSingleProduct } from '@/utils';
import { fetchWishlistProducts } from '@/lib/features/selection/selection-store';

export const WishList = () => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState<SingleProduct[]>([]);

  const usersState = useAppSelector(state => state.users);
  const selectionState: SelectionState = useAppSelector(state => state.selection);

  useEffect(() => {
    if(usersState.loggedUser){
      dispatch(fetchWishlistProducts(usersState.loggedUser.userId));
    }
  },[usersState]);


  useEffect(() => {
    setLoaded(true);
  },[]);

  useEffect(() => {
    if(!selectionState.loading){


      selectionState.products.forEach(async (product) => {
        const newProduct = await fetchSingleProduct(product.productId);
        setProducts(previousState => [...previousState, newProduct]);
      });
    }
  }, [selectionState]);


  
  if(!loaded || selectionState.loading) return <p>Loading...</p>  
  
  const productsState = {
    products: products,
    loading: selectionState.loading,
    error: '',
    elementsPerPage: products.length,
    totalPages: 1,
    totalElements: products.length
  }

  return (
    <>
      <ProductGrid productsState={productsState}/>
    </>
  )
}
