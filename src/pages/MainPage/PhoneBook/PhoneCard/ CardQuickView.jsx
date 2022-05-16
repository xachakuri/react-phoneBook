import React from 'react';
import Moment from 'react-moment';

import styles from './PhoneCard.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getPhoneById } from '../../../../redux/selector';

export const CardQuickView = ({ id }) => {
  const phoneQuickViewValue = useSelector((state) => getPhoneById(state, id));
  return (
    <div className={styles.cardInformation}>
      <h4>{phoneQuickViewValue.nameUser}</h4>
      <p>
        Город: <b>{phoneQuickViewValue.city} </b>
      </p>
      <p>
        Дата регистрации:{' '}
        <b>
          <Moment format="YYYY/MM/DD" date={phoneQuickViewValue.dateRegistration} />
        </b>
      </p>
      <p>
        Номер телефона: <b>{phoneQuickViewValue.phone}</b>
      </p>
    </div>
  );
};

CardQuickView.propTypes = {
  id: PropTypes.string,
};
