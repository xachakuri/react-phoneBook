import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { CardInsides } from './CardInsides';
import { Button } from '../../../../components';

import styles from './PhoneCard.module.scss';

export const PhoneCard = ({ id, phone, city, nameUser, dateRegistration, onEdit, onShow }) => {
  const onClickEdit = useCallback(() => {
    onEdit(id);
  }, [id]);
  const onClickShow = useCallback(() => {
    onShow(id);
  }, [id]);
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
            <Button onClick={onClickShow}>Быстрый просмотр</Button>
            <Button onClick={onClickEdit}>Редактировать</Button>
          </div>
        </div>
      </li>
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
  onShow: PropTypes.func,
};
