import React from 'react';
import { useSelector } from 'react-redux';
import { PhoneCard } from './PhoneCard/PhoneCard';
import { filteredPhones, listPhone } from '../../../redux/selector';

import styles from './PhoneBook.module.scss';

export const PhoneBook = () => {
  const phones = useSelector(listPhone);
  const phonesFiltering = useSelector(filteredPhones);
  return (
    <div className={styles.phoneBook}>
      {phones.length ? (
        <ul className={styles.wrapperPhoneBook}>
          {phonesFiltering.map((item) => (
            <PhoneCard key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        <div className={styles.emptyPhoneBook}>
          <h2>Телефонная книга пустая</h2>
        </div>
      )}
    </div>
  );
};
