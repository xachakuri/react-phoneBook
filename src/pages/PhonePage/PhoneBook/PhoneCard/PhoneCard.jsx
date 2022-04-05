import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardInsides } from './CardInsides';
import { PhoneDataForm } from '../../PhoneDataForm/PhoneDataForm';
import { Button, Modal } from '../../../../components';
import { addFormValue } from '../../../../redux';

import styles from './PhoneCard.module.scss';

export const PhoneCard = ({ id, phone, city, nameUser, dateRegistration }) => {
  const formValue = {
    formName: nameUser,
    formPhone: phone,
    formCity: city,
    formDate: dateRegistration.toString(),
  };
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onShow = useCallback(() => setIsOpen(true), [setIsOpen]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const isEdit = true;
  const onCloseEdit = useCallback(() => setIsOpenEdit(false), [setIsOpenEdit]);
  const onEdit = useCallback(() => {
    setIsOpenEdit(true);
    dispatch(addFormValue({ id }, formValue));
  }, [setIsOpenEdit]);
  return (
    <>
      <li className={styles.phoneCard}>
        <div className={styles.wrapperPhoneCard}>
          <CardInsides
            phone={phone}
            city={city}
            nameUser={nameUser}
            id={id}
            dateRegistration={dateRegistration}
          />
          <div className={styles.cardButtons}>
            <Button onClick={onShow}>Быстрый просмотр</Button>
            <Button onClick={onEdit}>Редактировать</Button>
          </div>
        </div>
      </li>
      <Modal title="Быстрый просмотр" onClose={onClose} isOpen={isOpen}>
        <CardInsides
          phone={phone}
          city={city}
          nameUser={nameUser}
          id={id}
          dateRegistration={dateRegistration}
        />
      </Modal>
      <Modal title="Режим редактирования" onClose={onCloseEdit} isOpen={isOpenEdit}>
        <PhoneDataForm onClose={onCloseEdit} id={id} isEdit={isEdit} />
      </Modal>
    </>
  );
};
