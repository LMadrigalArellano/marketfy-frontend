import { CartState } from "..";

export interface SingleOrder {
  id: string;
  userId: string;
  date: string;
  orderSummary: CartState;
}

