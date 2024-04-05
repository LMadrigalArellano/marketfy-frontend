'use client';

import { ProductsState } from '@/interfaces';
import { useAppSelector } from '@/lib/store';
import { Pagination, ProductGrid } from '..';

export const Catalog = () => {

  const productsState:ProductsState = useAppSelector(state => state.products);
  
  return (
    <>
      <ProductGrid productsState={productsState}/>
      <Pagination totalPages={productsState.totalPages}/>
    </>
  )
}
