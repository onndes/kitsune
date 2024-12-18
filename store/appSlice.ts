import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем тип состояния
interface AppState {
  currentLink: string;
  openedSubmenu: string;
}

const initialState: AppState = {
  currentLink: '',
  openedSubmenu: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetState: () => initialState,
    setLink(state, action: PayloadAction<string>) {
      state.currentLink = action.payload;
    },
    setOpenedSubmenu(state, action: PayloadAction<string>) {
      state.openedSubmenu = action.payload;
    },
  },
});

export const { setLink, setOpenedSubmenu } = appSlice.actions;

export default appSlice.reducer;
