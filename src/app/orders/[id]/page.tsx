import React from 'react'
import OrderData from './ui/OrderData';

interface Props {
  params: {
    id: string;
  }
}

const OrdersPage = ({ params }: Props) => {

  const { id } = params;

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px0'>
    <div className='flex flex-col w-[1000px]'>
      <h2 className='text-2xl mb-5'>
        Order: "{id}"
      </h2>
      <div className='grid grid-cols-2 sm:grid-cols-2 gap-10'>
        <OrderData id={id}/>
      </div>
    </div>
  </div>
  )
}

export default OrdersPage;