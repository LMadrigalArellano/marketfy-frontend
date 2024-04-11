"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { UsersState, User } from '@/interfaces';
import { addNewUser, fetchUserByEmail, validateLogin } from '@/lib/features/users/users-store';
import { useInputChangeHandler } from '@/utils/CustomHooks/useInputChangeHandler';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const usersState: UsersState = useAppSelector(state => state.users);

  const [loaded, setLoaded] = useState(false);
  const [newUserData, setNewUserData] = useState<User>({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    areasOfInterest: '',
  });

  const handleFormValueChange = (propertyName: string, propertyValue: string) => {
    useInputChangeHandler(propertyName, propertyValue, newUserData, setNewUserData);
  }

  const handleSubmitForm = async () => {    
    const emailAlreadyInUse = (await dispatch(fetchUserByEmail(newUserData.email))).payload;
    
    if(emailAlreadyInUse){
      alert('EMAIL ALREADY REGISTED!');
      return;
    }

    if(newUserData.email.length < 5){
      return alert('EMAIL ISSUE! Please add at least 5 characters');
    }
    if(newUserData.password.length < 3){
      return alert('PASSWORD ISSUE! Please add at least 3 characters');
    }
    if(newUserData.firstName.length < 3){
      return alert('FIRST NAME ISSUE! Please add at least 3 characters');
    }
    if(newUserData.lastName.length < 3){
      return alert('LAST NAME ISSUE! Please add at least 3 characters');
    }

    await dispatch(addNewUser(newUserData));

    if(loaded){
      if(usersState.error.length > 0){
        alert(usersState.error);
      } else {
        dispatch(validateLogin({email: newUserData.email, password: newUserData.password}));
        router.replace('/');
      }
    }
  }

  useEffect(() => {
    setLoaded(true);
  },[]);

  if(!loaded) return <p>Loading...</p>

  return (
    <form className="flex flex-col w-[420px]">

      <label onSubmit={handleSubmitForm} htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
        required={true}
        onChange={(event) => handleFormValueChange('email', event.target.value)}
      />

      <label htmlFor="email">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
        required={true}
        onChange={(event) => handleFormValueChange('password', event.target.value)}
      />

      <label htmlFor="first-name">First Name</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        name="first-name"
        required={true}
        onChange={(event) => handleFormValueChange('firstName', event.target.value)}
      />

      <label htmlFor="last-name">Last Name</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        name="last-name"
        required={true}
        onChange={(event) => handleFormValueChange('lastName', event.target.value)}
      />
    
      <label htmlFor="bio">Bio</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="text"
        name="bio"
        onChange={(event) => handleFormValueChange('bio', event.target.value)}
      />

      <label>Areas of interest</label>

      <div>
        <span className='mr-4'>
        <span className='mr-1'>Software</span> 
          <input
            type="checkbox"
            name="software"
            value='software'
            onChange={(event) => handleFormValueChange('areasOfInterest', event.target.value)}
          />
        </span>
        <span className='mr-4'>
        <span className='mr-1'>Animals</span> 
          <input
            type="checkbox"
            name="animal"
            value='animal'
            onChange={(event) => handleFormValueChange('areasOfInterest', event.target.value)}
          />
        </span>
        <span className='mr-4'>
        <span className='mr-1'>Sports</span> 
          <input
            type="checkbox"
            name="sport"
            value='sport'
            onChange={(event) => handleFormValueChange('areasOfInterest', event.target.value)}
          />
        </span>
      </div>

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
      </div>

      <button 
        onClick={() => handleSubmitForm()}
        className={"btn-primary"} 
        type='button'
      >
          Register
      </button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">Or</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};
