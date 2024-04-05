"use client";

import { useEffect, useState } from 'react';
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/store';
import { User } from '@/interfaces';
import { PrimaryButton } from '@/components';
import { v4 as uuidv4 } from 'uuid';
import { addNewUser, setLoggedUser } from '@/store/users/users-store';
import { handleInputChange } from '@/utils/handleInputChange';

export const RegisterForm = () => {

  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);
  const [inputLogin, setInputLogin] = useState<User>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    areasOfInterest: '',
    bio: '',
    role: 'user',
    id: uuidv4(),
  });

  const users: User[] = useAppSelector(state => state.users.users);

  const handleFormValueChange = (propertyName: string, propertyValue: string) => {
    handleInputChange(propertyName, propertyValue, inputLogin, setInputLogin);
  }

  const handleSubmitForm = () => {    

    if(users.find(x => x.email === inputLogin.email)){
      alert('EMAIL ISSUE!: Already registered');
      return;
    }
    if(inputLogin.email.length < 5){
      return alert('EMAIL ISSUE! Please add at least 5 characters');
    }
    if(inputLogin.password.length < 3){
      return alert('PASSWORD ISSUE! Please add at least 3 characters');
    }
    if(inputLogin.firstName.length < 3){
      return alert('FIRST NAME ISSUE! Please add at least 3 characters');
    }
    if(inputLogin.lastName.length < 3){
      return alert('LAST NAME ISSUE! Please add at least 3 characters');
    }

    dispatch(addNewUser(inputLogin));
    dispatch(setLoggedUser(inputLogin));
    window.location.replace('/');

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

      <PrimaryButton action={() => handleSubmitForm()} text='Register'/>

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
