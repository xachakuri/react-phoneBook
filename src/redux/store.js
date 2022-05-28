import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import phonesReducer from './phones/slice';
import interfaceReducer from './interface/slice';
import sagas from './phones/sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: {
    phones: phonesReducer,
    interface: interfaceReducer,
  },
  middleware: middlewares,
});

sagaMiddleware.run(sagas);

export default store;
