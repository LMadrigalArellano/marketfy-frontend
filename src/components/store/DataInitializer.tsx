'use client'

import { fetchProducts } from '@/lib/features/products/products-store';
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/store';

export const DataInitializer = () => {
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch( fetchProducts({pageIndex: 0, pageSize: 9}) );
  }, []);

	return (
		<></>
	);
}
