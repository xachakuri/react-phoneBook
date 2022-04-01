import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.phones || initialState;

export const listPhone = (state) => selectDomain(state).phones;

export const inputValue = (state) => selectDomain(state).value;

export const formStore = (state) => selectDomain(state).formValues;

export const filteredPhone = createSelector([listPhone, inputValue], (phones, value) => {
  return phones.filter((phone) => {
    return phone.nameUser.toLowerCase().includes(value.toLowerCase());
  });
});
