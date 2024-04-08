import { NewUser, UsersState } from '@/interfaces';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: UsersState = {
  loggedUser: undefined,
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

const addNewUser = createAsyncThunk('users/addNewUser', async (newUser: NewUser) => {
  
  const res = await fetch(
    `http://localhost:8080/marketfy/api/users`, 
    {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      "firstName": newUser.firstName,
      "lastName": newUser.lastName,
      "bio": newUser.bio,
      "email": newUser.email,
      "password":newUser.password,
      "areasOfInterest": newUser.areasOfInterest
    }),
  });

  return { 
    user: {email: newUser.email, password: newUser.password},
    text: await res.text(),
    status: res.status,
    statusText: res.statusText
  };
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoggedUser(state, action: PayloadAction<UsersState>){
      if(action.payload.loggedUser !== undefined){
        state.loggedUser = action.payload.loggedUser;
      }
    },
    logout(state){
      state.loggedUser = undefined;
    }
  },
  extraReducers: (builder) => {

    //---------------------LOGIN CASES---------------------//
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

    //---------------------NEW USER CASES---------------------//
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      if((action.payload.status !== 201) || !action.payload.text.includes('CREATED')){
        state.error = action.payload.text + "\n" + new Date().getTime().toFixed(2);
      }
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message! + new Date().getTime().toFixed(2);
    });
  }
});

export { addNewUser, validateLogin, fetchUserByEmail };

export const { 
  setLoggedUser,
  logout
} = usersSlice.actions

export default usersSlice.reducer