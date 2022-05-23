import { initialState } from './slice';

const rootSelector = (state) => state.interface || initialState;

export const isShowModalAddSelector = (state) => rootSelector(state).isShowModalAdd;

export const isShowModalEditSelector = (state) => rootSelector(state).isShowModalEdit;

export const isShowModalQuickSelector = (state) => rootSelector(state).isShowModalQuick;
