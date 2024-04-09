'use client';

import { ProductsState } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { Pagination, ProductGrid, SearchBar } from '..';
import { useEffect, useState } from 'react';
import { fetchProductsByTitle, fetchPaginatedProducts } from '@/lib/features/products/products-store';
import { usePathname, useSearchParams, redirect } from 'next/navigation';

export const Catalog = () => {
  const [searchText, setSearchText] = useState('');
  const dispatch = useAppDispatch();
  const [shouldReset, setShouldReset] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('pageIndex') ?? 1;
  const isCurrentPageANumber = !isNaN( +pageString );
  const currentPage =  !isCurrentPageANumber ? 1 : +pageString;
  let pageNumber = 1;
  if(currentPage < 1 || !isCurrentPageANumber){
    redirect(pathname);
  } else{
    pageNumber = currentPage;
  }

  useEffect(()=> {
    setShouldReset(false);
    const delay = setTimeout(() => {
      if(searchText !== ''){
        dispatch(fetchProductsByTitle(searchText));
      } else{
        dispatch(fetchPaginatedProducts({pageIndex: pageNumber - 1}));
      }
    }, 500);

    return () => clearTimeout(delay);

  },[searchText]);

  if(shouldReset) return <p>Loading...</p>;

  const productsState:ProductsState = useAppSelector(state => state.products);
  
  return (
    <>
      <SearchBar setSearchText={setSearchText}/>
      <ProductGrid productsState={productsState}/>
      {
        searchText === '' 
        ? <Pagination totalPages={productsState.totalPages}/>
        : <></>
      }
    </>
  )
}
