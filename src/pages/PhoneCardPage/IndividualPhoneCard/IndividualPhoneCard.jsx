import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import styles from './IndividualPhoneCard.module.scss';
import { Button } from '../../../components';
import { getPhoneById } from '../../../redux/phones/selector';

export const IndividualPhoneCard = ({ id }) => {
  const phoneById = useSelector((state) => getPhoneById(state, id));
  if (!phoneById) {
    return <Navigate to="/errorPage" />;
  }
  return (
    <div className={styles.individualPhoneCard}>
      <div className={styles.containerIndividualPhoneCard}>
        <div className={styles.phoneCardInfo}>
          <h4>
            <b>{phoneById.nameUser}</b>
          </h4>
          <p>
            Номер данного пользователя: <b>{phoneById.phone}</b>
          </p>
          <p>
            Локация телефона: <b>{phoneById.city}</b>
          </p>
          <p>
            Дата регистрации:{' '}
            <b>
              <Moment format="DD/MM/YYYY" date={phoneById.dateRegistration} />
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
