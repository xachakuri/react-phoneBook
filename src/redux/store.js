import { configureStore } from '@reduxjs/toolkit';
import phoneReducer from './slice';

export default configureStore({
  reducer: {
    phones: phoneReducer,
  },
});
