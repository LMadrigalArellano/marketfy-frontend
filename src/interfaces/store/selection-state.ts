
export interface SelectionState {
  products: SelectionRecord[];
  loading: boolean;
  error: String;
}

interface SelectionRecord {
  id: number;
  userId: number;
  productId: number;
  product_quantity: number;
  stored_in: string;
}
