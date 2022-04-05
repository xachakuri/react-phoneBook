import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PhoneDataForm } from '../PhoneDataForm/PhoneDataForm';
import { Button, Input, Modal } from '../../../components';
import { addSearchValue } from '../../../redux';

import styles from './PhoneControl.module.scss';

export const PhoneControl = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const onClose = useCallback(() => setIsOpenAdd(false), [setIsOpenAdd]);
  const onShow = useCallback(() => setIsOpenAdd(true), [setIsOpenAdd]);
  const dispatch = useDispatch();
  return (
    <div className={styles.formPhone}>
      <div className={styles.containerFormPhone}>
        <Input
          placeholder="Поиск номера телефона"
          onChange={(e) => dispatch(addSearchValue(e.target.value))}
        />
        <Button onClick={onShow}>Добавить ➕ </Button>
        <Modal title="Добавить телефон" onClose={onClose} isOpen={isOpenAdd}>
          <PhoneDataForm onClose={onClose} />
        </Modal>
      </div>
    </div>
  );
};
