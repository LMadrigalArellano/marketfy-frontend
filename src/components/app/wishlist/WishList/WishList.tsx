'use client';

import { SingleProduct } from '@/interfaces';
import { useAppSelector } from '@/store';
import { ProductGrid } from '..';
import { useEffect, useState } from 'react';

export const WishList = () => {
  const [loaded, setLoaded] = useState(false);

  const productsInWishList: SingleProduct[] = useAppSelector(state => state.products.products).filter((x) => x.inWishList);

  useEffect(() => {
    setLoaded(true);
  },[]);

  if(!loaded) return <p>Loading...</p>

  return (
    <ProductGrid products={productsInWishList}/>
  )
}
