'use client'

import Link from "next/link"
import { ActiveLink } from "..";
import { GoHome } from "react-icons/go";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { toggleMenu } from "@/lib/features/ui/sideMenuSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
// import { User } from "@/interfaces";
import { usePathname } from 'next/navigation';

const navItems = [
	{ path: '/catalog', text: 'Catalog' },
	{ path: '/orders', text: 'Orders' },
	{ path: '/wishlist', text: 'Wishlist' },
];

export const NavBar = () => {

	const dispatch = useAppDispatch();
  const cartItemCount = 0;
	const loggedUser = useAppSelector(state => state.users.loggedUser);
	// const cartItemCount:number = useAppSelector(state => state.cart.totalItems);
	const pathName = usePathname();

	return (
		<nav className='flex px-5 justify-between items-center w-full'>
			<Link href={'/'} className='flex items-center'>
				<GoHome className='mr-2'/>
				<span>Marketfy</span>
			</Link>
			{
				(loggedUser) && (
					<div className="hidden sm:block">
						{
							navItems.map(( item => {
								return  (
									<ActiveLink key={item.path} path={item.path} text={item.text}/>
								);
							}))
						}
					</div>
				)
			}
			
			<div className="flex items-center">
				{
					(loggedUser) && (
						<>
							<Link 
              href={`/user/${ loggedUser.userId }`}
              >
								<div className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
									{loggedUser.firstName}
								</div>
							</Link>
							<Link href='/cart' className="mx-2 hover:bg-gray-100">
								<div className="relative ">
									{cartItemCount > 0 && (
										<span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white ">
											{ cartItemCount }
										</span>
									)}
									<IoCartOutline className="w-5 h-5"/>
								</div>
							</Link>
						</>
					)
				}
				<button 
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					onClick={() => dispatch( toggleMenu() )}
				>
					Menu
				</button>
			</div>
		</nav>
	)
}
