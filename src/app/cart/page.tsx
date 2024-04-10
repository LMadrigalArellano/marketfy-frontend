import ProductsInCartGrid from '@/components/cart/ProductsInCartGrid';
import Link from 'next/link';
import React from 'react'
import { OrderSummary } from './ui/OrderSummary';
import { IsAuth, Title } from '@/components';

const CartPage = () => {  

  return (
    <IsAuth>
      <Title text={'Cart Page'}/>
      <div className='flex justify-center items-center mb-72 px-10 sm:px0'>
        <div className='flex flex-col w-[1000px]'>
          <div className='grid grid-cols-2 sm:grid-cols-2 gap-10'>
            <div className='flex flex-col mt-5'>
              <span className='text-xl'>Add more items</span>
              <Link href='/catalog' className='underline mb-5'>
                Continue shopping
              </Link>
              <ProductsInCartGrid />
            </div>
            <OrderSummary/>
          </div>
        </div>
      </div>
    </IsAuth>
  )
}

export default CartPage;