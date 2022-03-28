import React from 'react';
import PropTypes from 'prop-types';
import './Component.modules.scss';

export const Checkbox = ({ children, onChange, checked }) => {
  return (
    <label className="checkboxLabel">
      <input type="checkbox" onChange={onChange} checked={checked} />
      <span className="checkbox" />
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  children: PropTypes.node,
};
