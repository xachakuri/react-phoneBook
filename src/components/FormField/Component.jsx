import React from 'react';
import styles from './Component.module.scss';

export const FormField = ({ label, children, labelPosition, errors }) => {
  return (
    <div>
      <label className={styles.labelModal}>{label}</label>
      {children}
      <div className={styles.errorBlock}>
        <p>{errors}</p>
      </div>
    </div>
  );
};
