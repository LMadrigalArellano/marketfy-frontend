import React from 'react';
import { UserProfile } from './ui/UserProfile';
import { IsAuth } from '@/components';

const UserPage = async () => {
  return (
    <IsAuth>
      <UserProfile />
    </IsAuth>
  )
}

export default UserPage;
