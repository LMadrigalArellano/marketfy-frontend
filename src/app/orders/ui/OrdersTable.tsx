'use client';

import { IOrderRecord, ITableRecord, OrdersState, UsersState } from "@/interfaces";
import { fetchUserOrderRecords } from "@/lib/features/orders/orders.store";
// import { SingleOrder } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrdersTable = () => {
  const [loaded, setLoaded] = useState(false);
  const [tableElements, setTableElements] = useState({});

  const ordersState: OrdersState = useAppSelector(state => state.orders);

  // const orders: SingleOrder[] = useAppSelector(state => state.orders.orders).filter((order) => order.userId === loggedUserId);

  useEffect(() => {
    if(ordersState.loading === false){
      setTableElements(Object.groupBy(ordersState.orderRecords, ({orderId}) => orderId));
    }
  },[ordersState.loading]);

  useEffect(() => {
    setLoaded(true);
  },[]);

  if(!loaded) return <p>Loading...</p>

  return (
    <div className="mb-10">
      <table  className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th colSpan={3} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              ID
            </th>
            <th colSpan={1} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(tableElements as IOrderRecord).map((element) =>{
              console.log(element[0]);
              return (
                <tr key={element[0]} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {element[0]}
                </td>
                <td colSpan={1} className="text-sm text-gray-900 font-light px-6 ">
                  <Link 
                    href={`/orders/${element[0]}`} 
                    className="hover:underline"
                  >
                    View order
                  </Link>
                </td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default OrdersTable;
