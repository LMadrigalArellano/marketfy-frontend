'use client';

import { useState, useEffect } from 'react';

import { ProductCard } from "./ProductCard";
import { ProductsState } from "@/interfaces";
import { useAppDispatch } from '@/lib/store';
import { fetchPaginatedProducts, fetchProductsByTitle } from '@/lib/features/products/products-store';
import { redirect, usePathname, useSearchParams } from 'next/navigation';

interface Props {
  searchText: string;
  productsState: ProductsState;
}

export const ProductGrid = ({ searchText, productsState }: Props) => {
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

  if(shouldReset || productsState.loading) return <p>Loading...</p>;
  if(productsState.products.length === 0) return <p>No products</p>;

  return (
    <>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10 gap-10'>
        {
          productsState.products
          .map((product) => (
              <ProductCard 
                key={product.productId} 
                product={ product }
              />
          ))
        }
      </div>
    </>
  )
}
