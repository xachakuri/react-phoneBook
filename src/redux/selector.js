import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.phones || initialState;

export const listPhone = (state) => selectDomain(state).phones;

export const inputSearchValue = (state) => selectDomain(state).searchFilter;

export const filteredPhonesSelector = createSelector(
  [listPhone, inputSearchValue],
  (phones, value) => {
    return phones.filter((phone) => {
      return phone.nameUser.toLowerCase().includes(value.toLowerCase());
    });
  },
);

export const isLoadingSelector = (state) => selectDomain(state).isLoading;

const getId = (state, itemId) => itemId;

export const getPhoneById = createSelector([listPhone, getId], (items, itemId) => {
  return items.find((item) => item.id === itemId);
});
