'use client'

import { fetchProducts, setInitialProducts } from '@/lib/features/products/products-store';
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/store';

export const DataInitializer = () => {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch( fetchProducts() );
  }, []);

	return (
		<></>
	);
}
