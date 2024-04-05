'use client'

import { fetchPaginatedProducts } from '@/lib/features/products/products-store';
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/store';

export const DataInitializer = () => {
	// const dispatch = useAppDispatch();
	
	// useEffect(() => {
	// 	dispatch( fetchPaginatedProducts({pageIndex: 0, pageSize: 9}) );
  // }, []);

	return (
		<></>
	);
}
