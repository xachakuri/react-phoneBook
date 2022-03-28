import React from 'react';
import { Button, Input } from '../../../components';
import styles from './SearchNumber.module.scss';

export const SearchNumber = () => {
  return (
    <div className={styles.formPhone}>
      <div className={styles.containerFormPhone}>
        <Input placeholder="Поиск номера телефона" />
        <Button>Добавить ➕ </Button>
      </div>
    </div>
  );
};
