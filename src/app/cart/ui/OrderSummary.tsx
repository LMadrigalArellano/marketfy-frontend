'use client';

import { CartSummary } from "@/interfaces";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import Link from "next/link";

export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false);
  const { productsAmount, subTotal, taxes, total }: CartSummary = useAppSelector(state => state.cart.summaryInformation);

  useEffect(() => {
    setLoaded(true);
  },[]);

  if(!loaded) return <p>Loading...</p>;

  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-[290px]'>

      <h2 className='text-2xl mb-2'>
        Order summary
      </h2>

      <div className='grid grid-cols-2'>
        <span>Products amount: </span>
        <span className='text-right'>{ productsAmount } item{productsAmount > 1 ? 's' : ''} </span>
      </div>

      <div className='grid grid-cols-2'>
        <span>Subtotal: </span>
        <span className='text-right'>${ subTotal.toFixed(2) }</span>
      </div>

      <div className='grid grid-cols-2'>
        <span>Taxes (16%): </span>
        <span className='text-right'>${ taxes.toFixed(2) }</span>
      </div>

      <div className='grid grid-cols-2'>
        <span className='text-2xl mt-5'>Total: </span>
        <span className='text-2xl mt-5 text-right'>${total.toFixed(2)}</span>
      </div>
      <div className='mt-5 mb-2 w-full'>
        {
          productsAmount > 0 
          ?
          <Link 
          className='flex btn-primary justify-center w-full'
            href='/checkout'>
            Checkout
          </Link>
          :
          <button className='flex btn-disabled justify-center w-full'>
            Checkout
          </button>
        }
      </div>
    </div>
  )
}
