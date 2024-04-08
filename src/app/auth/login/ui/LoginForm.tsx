"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { User, UsersState } from '@/interfaces';
import { validateLogin } from  '@/lib/features/users/users-store';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {

  const dispatch = useAppDispatch();
  const usersState: UsersState = useAppSelector(state => state.users);
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [inputLogin, setInputLogin] = useState({email: '', password: ''});

  const handleInputChange = (propertyName: string, propertyValue: string) => {
    setInputLogin({
      ...inputLogin,
      [propertyName]: propertyValue
    });
  }

  useEffect(() => {
    if(loaded){
      if(usersState.error.length > 0){
        alert('Invalid credentials');
      } else {
        router.replace('/');
      }
    }
  }, [usersState.error, usersState.loggedUser, dispatch]);

  useEffect(() => {
    setLoaded(true);
  },[]);

  if(!loaded) return <p>Loading...</p>

  return (
    <form className="flex flex-col w-[420px]">
      <label htmlFor="email">Email</label>
      <input
        id="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
        onChange={(event) => handleInputChange('email', event.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
        onChange={(event) => handleInputChange('password', event.target.value)}

      />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
      </div>

      <button 
        onClick={() => dispatch(validateLogin(inputLogin))} 
        className={"btn-primary"} 
        type='button'
      >
        Login
      </button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create an account
      </Link>
    </form>
  );
};
