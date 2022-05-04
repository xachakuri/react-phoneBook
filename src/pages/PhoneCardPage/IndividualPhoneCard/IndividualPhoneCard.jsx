import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import styles from './IndividualPhoneCard.module.scss';
import { Button } from '../../../components';
import { getPhoneById } from '../../../redux/selector';

export const IndividualPhoneCard = ({ id }) => {
  const getPhone = useSelector((state) => getPhoneById(state, id));
  return (
    <div className={styles.individualPhoneCard}>
      <div className={styles.containerIndividualPhoneCard}>
        <div className={styles.phoneCardInfo}>
          <h4>
            <b>{getPhone.nameUser}</b>
          </h4>
          <p>
            Номер данного пользователя: <b>{getPhone.phone}</b>
          </p>
          <p>
            Локация телефона: <b>{getPhone.city}</b>
          </p>
          <p>
            Дата регистрации:{' '}
            <b>
              <Moment format="DD/MM/YYYY" date={getPhone.dateRegistration} />
            </b>
          </p>
          <Link to="/">
            <Button>Назад</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

IndividualPhoneCard.propTypes = {
  id: PropTypes.string.isRequired,
};
