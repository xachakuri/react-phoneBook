import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styles from './PhoneCard.module.scss';
import { Button, Modal } from '../../../../components';
import { CardInsides } from './CardInsides';
import { ModalForm } from '../../ModalForm/ModalForm';
import { useDispatch } from 'react-redux';
import { addFormValue } from '../../../../redux';

export const PhoneCard = ({ id, phone, city, nameUser, dateRegistration }) => {
  const formValue = {
    formName: nameUser,
    formPhone: phone,
    formCity: city,
    formDate: dateRegistration.toString(),
  };
  useEffect(() => {
    dispatch(addFormValue(formValue, id));
  });
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onShow = useCallback(() => setIsOpen(true), [setIsOpen]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const onCloseEdit = useCallback(() => setIsOpenEdit(false), [setIsOpenEdit]);
  const onEdit = useCallback(() => {
    setIsEdit(true);
    setIsOpenEdit(true);
  }, [setIsEdit, setIsOpenEdit]);
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
        <ModalForm onClose={onCloseEdit} id={id} isEdit={isEdit} />
      </Modal>
    </>
  );
};
