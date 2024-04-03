import { notFound } from 'next/navigation';
import React from 'react'

const getUsers = async () => {
  try {
    const users = await fetch(`http://localhost:8080/marketfy/api/users`)
    .then((res) => res.json())
    .then((json) => json);
  
    return users;
    
  } catch (error) {
    notFound();
  }
}

export const TestFetch = async () => {

  const users = await getUsers();

  return (
    <div>
      {JSON.stringify(users)}
    </div>
  )
}
