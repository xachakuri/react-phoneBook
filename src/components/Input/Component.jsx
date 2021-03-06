import React, { forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import './Component.modules.scss';

export const Input = forwardRef(
  (
    {
      onChange,
      type,
      value,
      className,
      theme = 'default',
      placeholder,
      register = () => null,
      name,
      onClick,
    },
    ref,
  ) => {
    return (
      <input
        onChange={onChange}
        type={type}
        value={value}
        className={clsx('input', `inputTheme_${theme}`, className)}
        placeholder={placeholder}
        {...register(name, {
          required: true,
        })}
        onClick={onClick}
      />
    );
  },
);

Input.propTypes = {
  onChange: PropTypes.func,
  theme: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
};
