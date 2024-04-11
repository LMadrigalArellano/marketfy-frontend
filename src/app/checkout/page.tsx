import React from 'react'
import ProductsToPay from './ui/ProductsToPay';
import VerifyOrder from './ui/VerifyOrder';
import { IsAuth, Title } from '@/components';

const VerifyOrderPage = () => {  
  return (
    <IsAuth>
      <Title text='Verify Order'/>
      <div className='flex justify-center items-center mb-72 px-10 sm:px0'>
      <div className='flex flex-col w-[1000px]'>
        <div className='grid grid-cols-2 sm:grid-cols-2 gap-10'>
          <ProductsToPay/>
          <VerifyOrder/>
          </div>
        </div>
      </div>
    </IsAuth>
  )
}

export default VerifyOrderPage;