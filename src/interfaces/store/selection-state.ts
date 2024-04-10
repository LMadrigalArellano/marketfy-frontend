import { SingleProduct } from "../products/single-product";

export interface SelectionState {
  products: SelectionRecord[];
  cart: SingleProduct[],
  wishlist: SingleProduct[],
  loading: boolean;
  error: String;
}

export interface SelectionRecord {
  id: number;
  userId: number;
  productId: number;
  product_quantity: number;
  stored_in: string;
}
