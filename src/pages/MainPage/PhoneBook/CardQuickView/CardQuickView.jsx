import React from 'react';
import Moment from 'react-moment';

import styles from '../PhoneCard/PhoneCard.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getPhoneById } from '../../../../redux/phones/selector';

export const CardQuickView = ({ id }) => {
  const phoneData = useSelector((state) => getPhoneById(state, id));
  return (
    <div className={styles.cardInformation}>
      <h4>{phoneData.nameUser}</h4>
      <p>
        Город: <b>{phoneData.city} </b>
      </p>
      <p>
        Дата регистрации:{' '}
        <b>
          <Moment format="YYYY/MM/DD" date={phoneData.dateRegistration} />
        </b>
      </p>
      <p>
        Номер телефона: <b>{phoneData.phone}</b>
      </p>
    </div>
  );
};

CardQuickView.propTypes = {
  id: PropTypes.string,
};
