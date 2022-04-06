import React from 'react';
import { useSelector } from 'react-redux';
import { PhoneCard } from './PhoneCard/PhoneCard';
import { filteredPhonesSelector, listPhone } from '../../../redux/selector';

import styles from './PhoneBook.module.scss';

export const PhoneBook = () => {
  const phones = useSelector(listPhone);
  const filteredPhones = useSelector(filteredPhonesSelector);
  return (
    <div className={styles.phoneBook}>
      {phones.length ? (
        <ul className={styles.wrapperPhoneBook}>
          {filteredPhones.map((item) => (
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
