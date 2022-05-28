import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  phones: [],
  searchFilter: '',
  isLoading: false,
  error: '',
};

const phoneSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    addPhone(state) {
      state.isLoading = true;
    },
    addPhoneSuccess(state, { payload }) {
      state.phones.push({
        ...payload,
      });
      state.isLoading = false;
    },
    addPhoneError(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    setSearchValue(state, { payload }) {
      state.searchFilter = payload;
    },
    loadPhones: (state) => {
      state.isLoading = true;
    },
    loadPhoneSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.phones = payload;
    },
    loadPhoneError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    deletePhone(state) {
      state.isLoading = true;
    },
    deletePhoneSuccess(state, { payload }) {
      state.phones = state.phones.filter((item) => item.id !== payload.id);
      state.isLoading = false;
    },
    deletePhoneError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    changePhone(state) {
      state.isLoading = true;
    },
    changePhoneSuccess(state, { payload }) {
      state.phones = state.phones.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              ...payload,
            }
          : item,
      );
      state.isLoading = false;
    },
    changePhoneError: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = phoneSlice;

export default phoneSlice.reducer;
