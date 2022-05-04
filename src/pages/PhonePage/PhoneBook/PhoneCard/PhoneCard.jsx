import React, { useCallback, useState } from 'react';
import styles from './PhoneCard.module.scss';
import { Button, Modal } from '../../../../components';
import { CardInsides } from './CardInsides';
import { ModalForm } from '../../ModalForm/ModalForm';
import { useDispatch } from 'react-redux';
import { addFormValue } from '../../../../redux';

  export const PhoneCard = ({ id, phone, city, nameUser, dateRegistration, onEdit }) => {
    const [isOpenQuickView, setIsOpenQuickView] = useState(false);
    const onClose = useCallback(() => setIsOpenQuickView(false), [setIsOpenQuickView]);
    const onShow = useCallback(() => setIsOpenQuickView(true), [setIsOpenQuickView]);

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
