import React, { forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import './Input.modules.scss';

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
      autoFocus,
      onBlur,
    },
    // eslint-disable-next-line no-unused-vars
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
        autoFocus={autoFocus}
        onBlur={onBlur}
      />
    );
  },
);

Input.displayName = 'Input';

Input.propTypes = {
  onChange: PropTypes.func,
  theme: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  autoFocus: PropTypes.bool,
  register: PropTypes.func,
  onBlur: PropTypes.func,
};
