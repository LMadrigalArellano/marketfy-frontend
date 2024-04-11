'use client';

import { CartProduct, IOrderRecord, OrdersState, SingleOrder } from "@/interfaces";
import { useAppSelector } from "@/lib/store";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';

const OrderData = ({id}: {id: string}) => {
  const [loaded, setLoaded] = useState(false);
  const [summary, setSummary] = useState({ 
    userId: 0,
    orderDate: '',
    subTotal: 0, 
    taxes: 0, 
    total: 0, 
    productsAmount: 0 
  });
  const [cart, setCart] = useState<CartProduct[]>([]);
  const ordersState: OrdersState = useAppSelector(state => state.orders);

  useEffect(() => {
    if(ordersState.loading === false){

      const filteredOrderRecords = (ordersState.orderRecords.filter(r => r.orderId === id));

      setCart(filteredOrderRecords.map((currentRecord) => {
        return {
          productId: currentRecord.productId,
          title: currentRecord.productTitle,
          price: currentRecord.productPrice,
          quantity: currentRecord.productQuantity,
          image: currentRecord.productImage
        };
      }));
      
      const subTotal = 
      filteredOrderRecords.reduce((accumulator, currentRecord) => 
        accumulator += (currentRecord.productPrice * currentRecord.productQuantity)
      ,0);
      const taxes = 0.16 * subTotal;
      const total = subTotal + taxes;
      const productsAmount = filteredOrderRecords.length;

      setSummary({ 
        userId: filteredOrderRecords[0].userId,
        orderDate: filteredOrderRecords[0].orderDate,
        subTotal, 
        taxes, 
        total, 
        productsAmount 
      });
    }
  },[ordersState.loading])

  useEffect(() => {
    setLoaded(true);
  },[]);

  if(!loaded) return <p>Loading...</p>

  if(!id) return notFound();

  return (
    <>
      <div className='flex flex-col mt-5'>
        {
          cart.map( product => (
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
                <p>${product.price} x {product.quantity}</p>
                <p className='font-bold'>Subtotal: ${product.price * product.quantity}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className='bg-white rounded-xl shadow-xl p-7 h-[300px]'>

        <h2 className='text-2xl mb-2'>
          Order summary
        </h2>

        <div className='flex justify-between'>
          <span>USER ID: </span>
          <span>{ summary.userId }</span>
        </div>

        <div className='grid grid-cols-2'>
          <span>Date: </span>
          <span className='text-right'>{ (new Date(summary.orderDate)).toLocaleString("en-US") }</span>
        </div>

        <div className='grid grid-cols-2'>
          <span>Products amount: </span>
          <span className='text-right'>{ summary.productsAmount } item{summary.productsAmount > 1 ? 's' : ''} </span>
        </div>

        <div className='grid grid-cols-2'>
          <span>Subtotal: </span>
          <span className='text-right'>${ summary.subTotal.toFixed(2) }</span>
        </div>

        <div className='grid grid-cols-2'>
          <span>Taxes (16%): </span>
          <span className='text-right'>${ summary.taxes.toFixed(2) }</span>
        </div>

        <div className='grid grid-cols-2'>
          <span className='text-2xl mt-5'>Total: </span>
          <span className='text-2xl mt-5 text-right'>${summary.total.toFixed(2)}</span>
        </div>
        <div className='mt-5 mb-2 w-full'>
      </div>
    </div>
  </>
  )
}


export default OrderData;