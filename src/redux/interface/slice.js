import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isShowModalAdd: false,
  isShowModalEdit: false,
  isShowModalQuick: false,
};

const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    updateModalAddState: (state, { payload }) => {
      state.isShowModalAdd = payload;
    },
    updateModalEditState: (state, { payload }) => {
      state.isShowModalEdit = payload;
    },
    updateModalQuickState: (state, { payload }) => {
      state.isShowModalQuick = payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = interfaceSlice;

export default interfaceSlice.reducer;
