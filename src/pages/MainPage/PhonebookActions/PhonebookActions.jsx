import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneDataForm } from '../PhoneDataForm/PhoneDataForm';
import { Button, Input, Modal } from '../../../components';
import { isShowModalAddSelector } from '../../../redux/interface/selector';
import { actions as phoneActions } from '../../../redux/phones/slice';
import { actions as interfaceActions } from '../../../redux/interface/slice';

import styles from './PhonebookActions.module.scss';
import { useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

export const PhonebookActions = () => {
  const dispatch = useDispatch();
  const isShowModalAdd = useSelector(isShowModalAddSelector);
  const onClose = useCallback(
    () => dispatch(interfaceActions.updateModalAddState(false)),
    [dispatch],
  );
  const onShow = useCallback(
    () => dispatch(interfaceActions.updateModalAddState(true)),
    [dispatch],
  );
  const [, setSearchParams] = useSearchParams({});
  const handleValue = useCallback(
    (e) => {
      dispatch(phoneActions.setSearchValue(e.target.value));
      if (e.target.value) {
        setSearchParams({ search: e.target.value });
      } else {
        setSearchParams({});
      }
    },
    [dispatch],
  );
  const submitAddForm = useCallback(
    (data) => {
      dispatch(
        phoneActions.addPhone({
          ...data,
          id: nanoid(),
          dateRegistration: data.dateRegistration.toString(),
        }),
      );
    },
    [dispatch],
  );
  const localStorageValue = JSON.parse(localStorage.getItem('form'));
  return (
    <div className={styles.formPhone}>
      <div className={styles.containerFormPhone}>
        <Input placeholder="Поиск номера по имени" onChange={handleValue} />
        <Button onClick={onShow}>Добавить ➕ </Button>
        <Modal title="Добавить телефон" onClose={onClose} isOpen={isShowModalAdd}>
          <PhoneDataForm
            onClose={onClose}
            onSubmit={submitAddForm}
            initialValue={localStorageValue}
          />
        </Modal>
      </div>
    </div>
  );
};
