import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar } from './pages/MainPage';
import PropTypes from 'prop-types';

function App({ children }) {
  return (
    <div className="App">
      <Navbar />
      {children}
    </div>
  );
}

export default App;

App.propTypes = {
  children: PropTypes.node,
};
