import OrdersTable from './ui/OrdersTable';
import { IsAuth, Title } from '@/components';

export default function Orders() {
  return (
    <IsAuth>
      <Title text='All Orders'/>
      <OrdersTable/>
    </IsAuth>
  );
}