import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  phones: [],
  value: '',
  formValues: {},
};

const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    addPhone(state, action) {
      state.phones.push({
        id: new Date().toISOString(),
        nameUser: action.payload.nameUser,
        city: action.payload.city,
        phone: action.payload.phone,
        dateRegistration: action.payload.dateRegistration,
      });
    },
    addValue(state, action) {
      state.value = action.payload;
    },
    removePhone(state, action) {
      state.phones = state.phones.filter((item) => item.id !== action.payload.id);
    },
    addFormValue(state, action) {
      const phoneValue = state.phones.find((item) => item.id === action.payload.id);
      state.formValues = phoneValue;
    },
    editValue(state, action) {
      state.phones = state.phones.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              nameUser: action.payload.nameUser,
              city: action.payload.city,
              phone: action.payload.phone,
              dateRegistration: action.payload.dateRegistration,
            }
          : item,
      );
    },
  },
});

export const { addPhone, removePhone, addValue, addFormValue, editValue } = phoneSlice.actions;

export default phoneSlice.reducer;
