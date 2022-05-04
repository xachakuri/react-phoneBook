import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneCard } from './PhoneCard/PhoneCard';
import { filteredPhonesSelector, getPhoneById, listPhone } from '../../../redux/selector';

import styles from './PhoneBook.module.scss';
import { Modal } from '../../../components';
import { PhoneDataForm } from '../PhoneDataForm/PhoneDataForm';
import { actions } from '../../../redux';

export const PhoneBook = () => {
  const phones = useSelector(listPhone);
  const dispatch = useDispatch();
  const filteredPhones = useSelector(filteredPhonesSelector);
  const [selectedId, setSelectedId] = useState(null);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const getPhone = useSelector((state) => getPhoneById(state, selectedId));
  const onCloseEdit = useCallback(() => setIsOpenEdit(false), [setIsOpenEdit]);
  const onEdit = useCallback(
    (id) => {
      setIsOpenEdit(true);
      setSelectedId(id);
    },
    [setIsOpenEdit, setSelectedId],
  );
  useEffect(() => dispatch(actions.loadPhones()), [dispatch]);
  return (
    <div className={styles.phoneBook}>
      {phones.length ? (
        <ul className={styles.wrapperPhoneBook}>
          {filteredPhones.map((item) => (
            <PhoneCard key={item.id} {...item} onEdit={onEdit} />
          ))}
        </ul>
      ) : (
        <div className={styles.emptyPhoneBook}>
          <h2>Телефонная книга пустая</h2>
        </div>
      )}
      <Modal title="Режим редактирования" onClose={onCloseEdit} isOpen={isOpenEdit}>
        <PhoneDataForm onClose={onCloseEdit} id={selectedId} isEdit getPhone={getPhone} />
      </Modal>
    </div>
  );
};
