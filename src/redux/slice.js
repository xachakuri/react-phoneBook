import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const initialState = {
  phones: [],
  searchFilter: '',
};

const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    addPhone(state, action) {
      state.phones.push({
        id: nanoid(),
        ...action.payload,
      });
    },
    setSearchValue(state, action) {
      state.searchFilter = action.payload;
    },
    removePhone(state, action) {
      state.phones = state.phones.filter((item) => item.id !== action.payload.id);
    },
    editPhone(state, action) {
      state.phones = state.phones.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              ...action.payload,
            }
          : item,
      );
    },
  },
});

export const { addPhone, removePhone, setSearchValue, editPhone } = phoneSlice.actions;

export default phoneSlice.reducer;
