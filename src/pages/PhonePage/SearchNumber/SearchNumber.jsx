import React, { useState, useCallback } from 'react';
import { Button, Input, Modal } from '../../../components';
import styles from './SearchNumber.module.scss';
import { ModalForm } from '../ModalForm/ModalForm';

export const SearchNumber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onShow = useCallback(() => setIsOpen(true), [setIsOpen]);

  return (
    <div className={styles.formPhone}>
      <div className={styles.containerFormPhone}>
        <Input placeholder="Поиск номера телефона" />
        <Button onClick={onShow}>Добавить ➕ </Button>
        <Modal title="Добавить телефон" onClose={onClose} isOpen={isOpen}>
          <ModalForm onClose={onClose} isEdit={false} />
        </Modal>
      </div>
    </div>
  );
};
