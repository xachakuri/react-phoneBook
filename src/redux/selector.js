import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.phones || initialState;

export const listPhone = (state) => selectDomain(state).phones;

export const formStore = (state) => selectDomain(state).formValues;
