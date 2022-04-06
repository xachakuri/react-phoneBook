import React, { useCallback, useState } from 'react';
import styles from './PhoneCard.module.scss';
import { Button, Modal } from '../../../../components';
import { CardInsides } from './CardInsides';

export const PhoneCard = ({ id, phone, city, nameUser, dateRegistration }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const onShow = useCallback(() => setIsOpen(true), [setIsOpen]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const onCloseEdit = useCallback(() => setIsOpenEdit(false), [setIsOpenEdit]);
  const onShowEdit = useCallback(() => setIsOpenEdit(true), [setIsOpenEdit]);

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
            <Button onClick={onShowEdit}>Редактировать</Button>
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
    </>
  );
};
