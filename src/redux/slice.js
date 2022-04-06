import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  phones: [],
  searchFilter: '',
  formValues: {},
};

const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    addPhone(state, action) {
      state.phones.push({
        id: new Date().toISOString(),
        ...action.payload,
      });
    },
    setSearchValue(state, action) {
      state.searchFilter = action.payload;
    },
    removePhone(state, action) {
      state.phones = state.phones.filter((item) => item.id !== action.payload.id);
    },
    addFormValue(state, action) {
      state.formValues = state.phones.find((item) => item.id === action.payload.id);
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

export const { addPhone, removePhone, setSearchValue, addFormValue, editPhone } =
  phoneSlice.actions;

export default phoneSlice.reducer;
