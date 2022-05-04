import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PhoneDataForm } from '../PhoneDataForm/PhoneDataForm';
import { Button, Input, Modal } from '../../../components';
import { actions } from '../../../redux/slice';

import styles from './PhonebookActions.module.scss';
import { useSearchParams } from 'react-router-dom';

export const PhonebookActions = () => {
  const [isAddPhoneData, setIsOpenAddPhoneData] = useState(false);
  const onClose = useCallback(() => setIsOpenAddPhoneData(false), [setIsOpenAddPhoneData]);
  const onShow = useCallback(() => setIsOpenAddPhoneData(true), [setIsOpenAddPhoneData]);
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams({});
  const handleValue = useCallback(
    (e) => {
      dispatch(actions.setSearchValue(e.target.value));
      setSearchParams({ search: e.target.value });
    },
    [dispatch],
  );
  const resetSearchParams = useCallback(() => {
    setSearchParams({});
  }, []);
  return (
    <div className={styles.formPhone}>
      <div className={styles.containerFormPhone}>
        <Input
          placeholder="Поиск номера по имени"
          onChange={handleValue}
          onBlur={resetSearchParams}
        />
        <Button onClick={onShow}>Добавить ➕ </Button>
        <Modal title="Добавить телефон" onClose={onClose} isOpen={isAddPhoneData}>
          <PhoneDataForm onClose={onClose} />
        </Modal>
      </div>
    </div>
  );
};
