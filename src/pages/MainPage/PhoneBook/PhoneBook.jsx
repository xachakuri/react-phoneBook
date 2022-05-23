import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as phoneActions } from '../../../redux/phones/slice';
import { actions as interfaceActions } from '../../../redux/interface/slice';
import { filteredPhonesSelector, getPhoneById } from '../../../redux/phones/selector';
import {
  isShowModalEditSelector,
  isShowModalQuickSelector,
} from '../../../redux/interface/selector';
import { PhoneCard } from './PhoneCard/PhoneCard';
import { PhoneDataForm } from '../PhoneDataForm/PhoneDataForm';
import { Modal } from '../../../components';

import styles from './PhoneBook.module.scss';
import { CardQuickView } from './CardQuickView/CardQuickView';

export const PhoneBook = () => {
  const dispatch = useDispatch();
  const filteredPhones = useSelector(filteredPhonesSelector);
  const isShowModalEdit = useSelector(isShowModalEditSelector);
  const isShowModalQuick = useSelector(isShowModalQuickSelector);
  const [selectedId, setSelectedId] = useState(null);
  const phoneValue = useSelector((state) => getPhoneById(state, selectedId));
  const closeQuickView = useCallback(
    () => dispatch(interfaceActions.updateModalQuickState(false)),
    [dispatch],
  );
  const openQuickView = useCallback(
    (id) => {
      dispatch(interfaceActions.updateModalQuickState(true));
      setSelectedId(id);
    },
    [setSelectedId],
  );
  const closeEdit = useCallback(
    () => dispatch(interfaceActions.updateModalEditState(false)),
    [dispatch],
  );
  const openEdit = useCallback(
    (id) => {
      dispatch(interfaceActions.updateModalEditState(true));
      setSelectedId(id);
    },
    [setSelectedId],
  );
  const submitEditForm = useCallback(
    (data) => {
      dispatch(
        phoneActions.changePhone({
          ...data,
          selectedId,
          dateRegistration: data.dateRegistration.toString(),
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => dispatch(phoneActions.loadPhones()), [dispatch]);
  return (
    <div className={styles.phoneBook}>
      <ul className={styles.wrapperPhoneBook}>
        {filteredPhones.map((item) => (
          <PhoneCard key={item.id} {...item} onEdit={openEdit} onShow={openQuickView} />
        ))}
      </ul>
      <Modal title="Режим редактирования" onClose={closeEdit} isOpen={isShowModalEdit}>
        <PhoneDataForm
          onClose={closeEdit}
          id={selectedId}
          isEdit
          phoneValue={phoneValue}
          onSubmit={submitEditForm}
          initialValue={phoneValue}
        />
      </Modal>
      <Modal title="Быстрый просмотр" onClose={closeQuickView} isOpen={isShowModalQuick}>
        <CardQuickView id={selectedId} />
      </Modal>
    </div>
  );
};
