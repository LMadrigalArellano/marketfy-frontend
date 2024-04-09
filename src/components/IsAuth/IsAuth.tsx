'use client';

import { useAppSelector } from "@/lib/store";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

export const IsAuth = ({children}: { children: React.ReactNode }) => {

  const usersState = useAppSelector(state => state.users);
  
  useLayoutEffect(() => {
    if(usersState.loading === false){
      if(usersState.loggedUser === undefined){
        redirect('/auth/login');
      }
    }
  },[]);
  
  return (
    <>
      {children}
    </>
  )
}
