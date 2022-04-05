import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import './Button.modules.scss';

export const Button = ({
  children,
  onClick,
  type = 'button',
  theme = 'default',
  className,
  isActive,
}) => {
  return (
    <button
      className={clsx('button', `buttonTheme_${theme}`, className, {
        button_active: isActive,
      })}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.string,
  theme: PropTypes.string,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};
