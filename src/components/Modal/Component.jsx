import React from 'react';
import styles from './Component.module.scss';
import clsx from 'clsx';
import { Button } from '../Button/Component';

export const Modal = ({ isOpen, onClose, children, title }) => {
  return isOpen ? (
    <div className={clsx(styles.modal, { [styles.active]: isOpen })}>
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
