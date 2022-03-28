import React from 'react';
import styles from './PhoneCard.module.scss';
import Moment from 'react-moment';
export const CardInsides = ({ id, phone, city, nameUser, dateRegistration }) => {
  return (
    <div className={styles.cardInformation}>
      <h4>{nameUser}</h4>
      <p>
        Город:<b>{city}</b>
      </p>
      <p>
        Дата регистрации:
        <b>
          <Moment format="YYYY/MM/DD" date={dateRegistration} />
        </b>
      </p>
      <p>
        Номер телефона:<b>{phone}</b>
      </p>
    </div>
  );
};
