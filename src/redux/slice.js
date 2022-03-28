import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  phones: [],
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
  },
});

export const { addPhone } = phoneSlice.actions;

export default phoneSlice.reducer;
