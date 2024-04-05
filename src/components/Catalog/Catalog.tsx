'use client';

import { ProductsState } from '@/interfaces';
import { useAppSelector } from '@/lib/store';
import { Pagination, ProductGrid, SearchBar } from '..';
import { useState } from 'react';

export const Catalog = () => {
  const [searchText, setSearchText] = useState('');

  const productsState:ProductsState = useAppSelector(state => state.products);
  
  return (
    <>
      <SearchBar setSearchText={setSearchText}/>
      <ProductGrid searchText={searchText} productsState={productsState}/>
      {
        searchText === '' 
        ? <Pagination totalPages={productsState.totalPages}/>
        : <></>
      }
    </>
  )
}
