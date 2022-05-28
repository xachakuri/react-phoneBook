import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const rootSelector = (state) => state.phones || initialState;

export const phonesSelector = (state) => {
  return rootSelector(state).phones.length ? rootSelector(state).phones : [];
};
export const inputSearchValue = (state) => rootSelector(state).searchFilter;

export const filteredPhonesSelector = createSelector(
  [phonesSelector, inputSearchValue],
  (phones, value) => {
    return phones.filter((phone) => {
      return phone.nameUser.toLowerCase().includes(value.toLowerCase());
    });
  },
);

export const isLoadingSelector = (state) => rootSelector(state).isLoading;

const getIdSelector = (state, itemId) => itemId;

export const getPhoneById = createSelector([phonesSelector, getIdSelector], (items, itemId) => {
  return items.find((item) => item.id === itemId);
});
