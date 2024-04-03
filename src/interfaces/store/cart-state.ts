import { CartProduct } from "..";

export interface CartSummary {
  productsAmount: number;
  subTotal: number;
  taxes: number;
  total: number;
}

export interface CartState {
  cart: CartProduct[];
  totalItems: number;
  summaryInformation: CartSummary;
}

