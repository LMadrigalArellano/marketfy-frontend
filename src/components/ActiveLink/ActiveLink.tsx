'use client';

import Link from "next/link";

import { usePathname } from "next/navigation";

interface Props {
	path: string;
	text: string;
}

export const ActiveLink = ({ path, text }: Props) => {

	const pathName = usePathname();

	return (
		<Link 
			className={ 
				`${path === pathName ? 'text-blue-500' : ''} 
				m-2 p-2 rounded-md transition-all hover:bg-gray-100 hover:text-blue-400
				`
			}
			href={path}>
				{text}
		</Link>
	)
}
