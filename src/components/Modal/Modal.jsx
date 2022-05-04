import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Button } from '../Button/Button';

import styles from './Modal.module.scss';

export const Modal = ({ isOpen, onClose, children, title }) => {
  const closeModalOnEsc = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return isOpen ? (
    <div
      className={clsx(styles.modal, { [styles.active]: isOpen })}
      tabIndex="0"
      onKeyDown={closeModalOnEsc}
    >
      <div className={styles.containerModal}>
        <div className={styles.modalTitle}>
          <h2>{title}</h2>
          <Button onClick={onClose} theme="close">
            &times;
          </Button>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};
Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
  onkeydown: PropTypes.func,
};
