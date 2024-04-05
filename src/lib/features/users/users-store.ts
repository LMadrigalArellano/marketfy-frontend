import { User, UsersState } from '@/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: UsersState = {
  users: [],
  loading: true,
  error: '',
}

const fetchUserByEmail = createAsyncThunk('users/fetchUserByEmail', async (email:string) => {
  const res = await fetch(`http://localhost:8080/marketfy/api/users/email/${email}`);
  return await res.json();
});

const validateLogin = createAsyncThunk('users/validateLogin', async ({email, password}:{email: string, password: string}) => {
  const res = await fetch(
    `http://localhost:8080/marketfy/api/users/login`, 
    {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify({ 
      email,
      password, 
    }),
  });
  return await res.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state){
      state.loggedUser = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(validateLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedUser = action.payload;
      state.error = '';
      
    });
    builder.addCase(validateLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message! + new Date().getTime().toFixed(2);
    });
  }
});

export { validateLogin };

export const { 
  logout
} = usersSlice.actions

export default usersSlice.reducer