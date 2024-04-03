'use client';

import { ProductsState, SingleProduct } from '@/interfaces';
import { useAppSelector } from '@/lib/store';
import { ProductGrid } from '..';

export const Catalog = () => {

  const productsState:ProductsState = useAppSelector(state => state.products);
  
  return (
    <ProductGrid productsState={productsState}/>
  )
}
