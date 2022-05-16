import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage, PhoneCardPage } from './pages';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <Routes>
          <Route exact path="/*" element={<MainPage />} />
          <Route path="/items/:id" element={<PhoneCardPage />} />
          <Route path="/errorPage" element={<ErrorPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
