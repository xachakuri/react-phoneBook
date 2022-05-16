import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneDataForm } from '../PhoneDataForm/PhoneDataForm';
import { Button, Input, Modal } from '../../../components';
import { actions } from '../../../redux';

import styles from './PhonebookActions.module.scss';
import { useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { isShowModalAddSelector } from '../../../redux/selector';

export const PhonebookActions = () => {
  const dispatch = useDispatch();
  const isShowModalAdd = useSelector(isShowModalAddSelector);
  const onClose = useCallback(() => dispatch(actions.showModalAdd(false)), [dispatch]);
  const onShow = useCallback(() => dispatch(actions.showModalAdd(true)), [dispatch]);
  const [, setSearchParams] = useSearchParams({});
  const handleValue = useCallback(
    (e) => {
      dispatch(actions.setSearchValue(e.target.value));
      if (e.target.value) {
        setSearchParams({ search: e.target.value });
      } else {
        setSearchParams({});
      }
    },
    [dispatch],
  );
  const onSubmitAdd = useCallback(
    (data) => {
      dispatch(
        actions.addPhone({
          ...data,
          id: nanoid(),
          dateRegistration: data.dateRegistration.toString(),
        }),
      );
      localStorage.clear();
    },
    [dispatch],
  );
  return (
    <div className={styles.formPhone}>
      <div className={styles.containerFormPhone}>
        <Input placeholder="Поиск номера по имени" onChange={handleValue} />
        <Button onClick={onShow}>Добавить ➕ </Button>
        <Modal title="Добавить телефон" onClose={onClose} isOpen={isShowModalAdd}>
          <PhoneDataForm onClose={onClose} onSubmit={onSubmitAdd} />
        </Modal>
      </div>
    </div>
  );
};
