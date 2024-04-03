import { createSlice } from '@reduxjs/toolkit';

interface MenuState {
  isOpen: boolean;
}

const initialState: MenuState = {
  isOpen: false
}

const sideMenuSlice = createSlice({
  name: 'isSideMenuOpen',
  initialState,
  reducers: {
    toggleMenu(state) {
      state.isOpen = !state.isOpen;
    }
  }
});

export const { toggleMenu } = sideMenuSlice.actions;

export default sideMenuSlice.reducer;