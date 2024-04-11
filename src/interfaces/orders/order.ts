import { CartState } from "..";

export interface IOrderRecord {
  id: number;
  orderId: string;
  orderDate: string;
  userId: number;
  productId: number;
  productPrice: number;
  productQuantity: number;
	productTitle: string;
  productImage: string;
}

export interface ITableRecord {
  key: string;
  value: IOrderRecord[]
}

export interface SingleOrder {
  id: string;
  userId: string;
  date: string;
  orderSummary: CartState;
}

