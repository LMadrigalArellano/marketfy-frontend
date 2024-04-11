import { IOrderRecord } from "../orders/order";

export interface OrdersState {
  orderRecords: IOrderRecord[];
  loading: boolean;
  error: String;
}