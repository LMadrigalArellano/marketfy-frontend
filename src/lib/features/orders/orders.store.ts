import { OrdersState, IOrderRecord, SelectionRecord } from '@/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const fetchUserOrderRecords = createAsyncThunk('orders/fetchUserOrders', async (userId: number) => {
  const res = await fetch(`http://localhost:8080/marketfy/api/users/${userId}/orders`);
  return await res.json();
});

const postNewOrderRecord = createAsyncThunk('user/postOrderRecord', async (record: IOrderRecord) => {

    await fetch(`http://localhost:8080/marketfy/api/orders`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...record,
      }),
    }
  );
});

const initialState: OrdersState = {
  orderRecords: [],
  loading: true,
  error: '',
}

const cartSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

    // setInitialOrders(state, action: PayloadAction<OrdersState>){
    //   if(action.payload.orders.length > 0){
    //     state.orders = action.payload.orders;
    //   }
    // },

    // addNewOrder(state, action: PayloadAction<IOrderRecord>){
    //   state.orders.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserOrderRecords.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserOrderRecords.fulfilled, (state, action) => {
      state.loading = false;
      state.orderRecords = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUserOrderRecords.rejected, (state, action) => {
      state.loading = false;
      state.orderRecords = [];
      state.error = action.error.message!;
    });

    ////////////////////////////////////////////////////////////

    builder.addCase(postNewOrderRecord.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postNewOrderRecord.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(postNewOrderRecord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
  }
});

export { fetchUserOrderRecords, postNewOrderRecord };

export const {
  // setInitialOrders, 
  // addNewOrder,
} = cartSlice.actions

export default cartSlice.reducer