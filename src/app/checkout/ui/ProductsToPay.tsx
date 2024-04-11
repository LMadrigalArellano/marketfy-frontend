'use client'

import Link from "next/link";
import Image from 'next/image';
import { CartProduct } from "@/interfaces";
import { useAppSelector } from "@/lib/store";

const ProductsToPay = () => {

  const productsInCart: CartProduct[] = useAppSelector(state => state.cart.cart);

  return (
    <div className='flex flex-col mt-5'>
      <span className='text-xl'>Adjust items</span>
      <Link href='/cart' className='underline mb-5'>
        Edit cart
      </Link>

      {
        productsInCart.map( product => (
          <div key={product.productId} className='flex mb-5'>
            <Image
              src={product.image}
              width={100}
              height={100}
              alt={product.title}
              className='mr-5 rounded'
              style={{
                height: '100px',
                width: '100px',
              }}
            />

            <div>
              <p>{product.title}</p>
              <p>${product.price} x 3</p>
              <p className='font-bold'>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default ProductsToPay;
