import React, { useState, useCallback } from 'react';
import { Button, Input, Modal } from '../../../components';
import styles from './SearchNumber.module.scss';
import { ModalForm } from '../ModalForm/ModalForm';
import { useDispatch } from 'react-redux';
import { addValue } from '../../../redux';

export const SearchNumber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onShow = useCallback(() => setIsOpen(true), [setIsOpen]);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const onCreate = useCallback(() => {
    setIsEdit(false);
  }, [setIsEdit]);
  return (
    <div className={styles.formPhone}>
      <div className={styles.containerFormPhone}>
        <Input
          placeholder="Поиск номера телефона"
          onChange={(e) => dispatch(addValue(e.target.value))}
        />
        <Button onClick={onShow}>Добавить ➕ </Button>
        <Modal title="Добавить телефон" onClose={onClose} isOpen={isOpen}>
          <ModalForm onClose={onClose} isEdit={isEdit} onCreate={onCreate} />
        </Modal>
      </div>
    </div>
  );
};
