'use client'

import Image from "next/image";

import { CartProduct } from "@/interfaces"
import { useDispatch } from "react-redux";
import { calculateTotalItems, removeProduct, setSummaryInformation } from "@/lib/features/cart/cart-store";

interface Props {
  product: CartProduct,
}

export default ({ product }: Props) => {
  const dispatch = useDispatch();

  const handleRemoveProduct = () => {
    dispatch( removeProduct(product) );
    dispatch( calculateTotalItems() );
    dispatch( setSummaryInformation() );
  }
  
  return (
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
      <p>${product.price}</p>
      <p>
        {product.quantity} item{product.quantity > 1 && 's'}
      </p>
      <p className="font-bold">Subtotal: ${ (product.quantity * product.price).toFixed(2) }</p>
      <button className='underline mt-3' onClick={handleRemoveProduct}>
        Remove
      </button>
    </div>
  </div>
  )
}
