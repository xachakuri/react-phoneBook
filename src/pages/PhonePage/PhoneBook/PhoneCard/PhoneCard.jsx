import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CardInsides } from './CardInsides';
import { Button, Modal } from '../../../../components';

import styles from './PhoneCard.module.scss';

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
            <Button onClick={() => onEdit(id)}>Редактировать</Button>
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
    </>
  );
};

PhoneCard.propTypes = {
  nameUser: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dateRegistration: PropTypes.string.isRequired,
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onEdit: PropTypes.func,
};
