import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
  const [isOpenQuickView, setIsOpenQuickView] = useState(false);
  const onClose = useCallback(() => setIsOpenQuickView(false), [setIsOpenQuickView]);
  const onShow = useCallback(() => setIsOpenQuickView(true), [setIsOpenQuickView]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
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
      <Modal title="Быстрый просмотр" onClose={onClose} isOpen={isOpenQuickView}>
        <CardInsides
          phone={phone}
          city={city}
          nameUser={nameUser}
          id={id}
          dateRegistration={dateRegistration}
        />
      </Modal>
      <Modal title="Режим редактирования" onClose={onCloseEdit} isOpen={isOpenEdit}>
        <PhoneDataForm onClose={onCloseEdit} id={id} isEdit />
      </Modal>
    </>
  );
};

PhoneCard.propTypes = {
  nameUser: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dateRegistration: PropTypes.string.isRequired,
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
