'use client';

import { CartState, OrdersState, ProductsState, UsersState } from "@/interfaces";

interface parsedValues {
  // products: ProductsState,
  // cart: CartState,
  // orders: OrdersState,
  users: UsersState,
}

const defaultValue: parsedValues = {
  // products: {
  //   products: [],
  // },
  // cart: {
  //   cart: [],
  //   totalItems: 0,
  //   summaryInformation: {
  //     productsAmount: 0,
  //     subTotal: 0,
  //     taxes: 0,
  //     total: 0,
  //   }
  // },
  // orders: {
  //   orders:[]
  // },
  users: {
    loggedUser: undefined,
    loading: true,
    error: '',
  }
}

export const loadState = ():parsedValues => {

  try {
    const serializedState = localStorage.getItem('state');

    if(serializedState === null) {
      return defaultValue;
    }

    return JSON.parse(serializedState);

  } catch (error) {
    return defaultValue;

  }
}

export const saveState = (state: any) => {

  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);

  } catch (error) {
    
  }

}