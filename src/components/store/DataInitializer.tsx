'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/store';
import { loadState } from '@/utils/localStorage';
import { setInitialUsers } from '@/lib/features/users/users-store';

export const DataInitializer = () => {
	const dispatch = useAppDispatch();
	const [persistedState] = useState(loadState());

	
	useEffect(() => {
		dispatch( setInitialUsers(persistedState.users));
  }, []);

	return (
		<></>
	);
}
