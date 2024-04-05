import { SingleProduct } from "..";

export interface ProductsState {
  products: SingleProduct[];
  loading: boolean;
  error: String;
  elementsPerPage: number;
  totalPages: number;
  totalElements: number;
}
