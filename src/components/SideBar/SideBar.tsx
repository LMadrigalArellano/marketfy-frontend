'use client'

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { toggleMenu } from "@/lib/features/ui/sideMenuSlice";
// import { logout } from "@/store/users/users-store";
import Link from "next/link";
import { IoCloseOutline, IoHeartOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoTicketOutline } from "react-icons/io5";

export const SideBar = () => {

  const isMenuOpen = useAppSelector(state => state.sideMenu.isOpen);
  const loggedUser = undefined;
  // const loggedUser = useAppSelector(state => state.users.loggedUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch( toggleMenu() );  
    // dispatch( logout() );
    window.location.replace('/');
  }

  return (
    <div>
      {
        isMenuOpen && (
          <>
            <div 
              className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
            />
            <div
              onClick={ () => dispatch( toggleMenu() )}
              className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            />
            <nav 
              className="fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300"
            >
              {
              (loggedUser !== undefined) && (
                <>
                  <IoCloseOutline 
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => dispatch( toggleMenu() )}
                  />
                  <Link
                    href='/'
                    // href={`/user/${ loggedUser.id }`}
                    onClick={() => dispatch( toggleMenu() )}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                  >
                    <IoPersonOutline size={30} />
                    <span className="ml-3 text-xl">Profile</span>
                  </Link>

                  <Link
                    href="/orders"
                    onClick={() => dispatch( toggleMenu() )}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                  >
                    <IoTicketOutline size={30} />
                    <span className="ml-3 text-xl">My orders</span>
                  </Link>

                  <Link
                    href="/wishlist"
                    onClick={() => dispatch( toggleMenu() )}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                  >
                    <IoHeartOutline size={30} />
                    <span className="ml-3 text-xl">Wishlist</span>
                  </Link>

                  <Link
                    href="/"
                    onClick={handleLogout}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                  >
                  <IoLogOutOutline size={30} />
                  <span className="ml-3 text-xl">Log out</span>
                </Link>
                </>
                )
              } 

              {(loggedUser === undefined) && (
                  <Link
                    href="/auth/login"
                    onClick={() => dispatch( toggleMenu() )}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                  >
                  <IoLogInOutline size={30} />
                  <span className="ml-3 text-xl">Log in</span>
                </Link>
              )}
              <div className="w-full h-px bg-gray-200 my-10"/>
            </nav>
          </>
        )
      }

    </div>
  )
}
