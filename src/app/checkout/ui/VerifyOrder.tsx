'use client';

import { CartProduct, CartSummary, IOrderRecord, SingleOrder, User } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { clearCart, calculateTotalItems } from "@/lib/features/cart/cart-store";
import { fetchUserOrderRecords, postNewOrderRecord } from "@/lib/features/orders/orders.store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const VerifyOrder = () => {
  const [loaded, setLoaded] = useState(false);
  
  const dispatch = useAppDispatch();
  const summaryInformation: CartSummary = useAppSelector(state => state.cart.summaryInformation);
  const productsInCart: CartProduct[] = useAppSelector(state => state.cart.cart);
  const loggedUser = useAppSelector(state => state.users.loggedUser);

  const { productsAmount, subTotal, taxes, total } = summaryInformation;

  useEffect(() => {
    setLoaded(true);
  },[]);

  if(!loaded) return <p>Loading...</p>;

  const handleSubmitOrder = () => {

    const orderId = uuidv4();
    const orderDate = new Date();
    const userId = parseInt(loggedUser!.userId);

    productsInCart.forEach((currentProduct) => {
      const newOrderRecord: IOrderRecord = {
        id: 0,
        orderId,
        orderDate,
        userId,
        productId: currentProduct.productId,
        productPrice: currentProduct.price,
        productQuantity: currentProduct.quantity,
        productTitle: currentProduct.title,
        productImage: currentProduct.image
      }

      dispatch( postNewOrderRecord(newOrderRecord) );
    });

    dispatch( clearCart() );
    dispatch( calculateTotalItems() );
    dispatch( fetchUserOrderRecords(parseInt(loggedUser!.userId)) );
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7 h-[300px]'>

      <h2 className='text-2xl mb-2'>
        Verify order
      </h2>

      <div className='grid grid-cols-2'>
        <span>User: </span>
        <span className='text-right'>{loggedUser!.firstName} { loggedUser!.lastName}</span>
      </div>

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
      <Link 
        className='flex btn-primary justify-center'
        href='/orders'
        onClick={handleSubmitOrder}>
        Place order
      </Link>
    </div>
  </div>
  )
}

export default VerifyOrder;