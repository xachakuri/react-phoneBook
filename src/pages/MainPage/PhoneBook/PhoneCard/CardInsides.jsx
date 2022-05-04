import React from 'react';
import Moment from 'react-moment';

import styles from './PhoneCard.module.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const CardInsides = ({ phone, city, nameUser, dateRegistration, id }) => {
  return (
    <div className={styles.cardInformation}>
      <Link to={`/items/${id}`}>
        <h4>{nameUser}</h4>
      </Link>
      <p>
        Город: <b>{city}</b>
      </p>
      <p>
        Дата регистрации:{' '}
        <b>
          <Moment format="YYYY/MM/DD" date={dateRegistration} />
        </b>
      </p>
      <p>
        Номер телефона: <b>{phone}</b>
      </p>
    </div>
  );
};

CardInsides.propTypes = {
  nameUser: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  dateRegistration: PropTypes.string.isRequired,
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.string,
};
