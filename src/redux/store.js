import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import phoneReducer from './slice';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: {
    phones: phoneReducer,
  },
  middleware: middlewares,
});

sagaMiddleware.run(sagas);

export default store;
