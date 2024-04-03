import { SingleProduct } from "..";

export interface ProductsState {
  products: SingleProduct[];
  loading: boolean;
  error: String;
}
