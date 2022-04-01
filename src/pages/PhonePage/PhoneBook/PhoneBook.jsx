import React from 'react';
import styles from './PhoneBook.module.scss';
import { PhoneCard } from './PhoneCard/PhoneCard';
import { useSelector } from 'react-redux';
import { filteredPhone, listPhone } from '../../../redux/selector';

export const PhoneBook = () => {
  const phones = useSelector(listPhone);
  const filteredPhones = useSelector(filteredPhone);
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
