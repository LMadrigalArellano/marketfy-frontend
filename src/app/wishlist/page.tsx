import React from 'react';
import { IsAuth, Title, WishList } from '@/components';

const WishListPage = async () => {
  return (
    <IsAuth>
      <Title text={'Wishlist'}/>
      <WishList />
    </IsAuth>
  )
}

export default WishListPage;
