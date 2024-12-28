import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем тип состояния
interface AppState {
  currentLink: string;
  openedSubmenu: string;
  activeSubcategory: string;
}

const initialState: AppState = {
  currentLink: '',
  openedSubmenu: '',
  activeSubcategory: '',
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
    setActiveSubcategory(state, action: PayloadAction<string>) {
      state.activeSubcategory = action.payload;
    },
  },
});

export const { setLink, setOpenedSubmenu, setActiveSubcategory } =
  appSlice.actions;

export default appSlice.reducer;
