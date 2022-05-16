import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filteredPhonesSelector,
  getPhoneById,
  isShowModalEditSelector,
  isShowModalQuickSelector,
} from '../../../redux/selector';
import { actions } from '../../../redux';
import { PhoneCard } from './PhoneCard/PhoneCard';
import { PhoneDataForm } from '../PhoneDataForm/PhoneDataForm';
import { Modal } from '../../../components';

import styles from './PhoneBook.module.scss';
import { CardQuickView } from './PhoneCard/ CardQuickView';

export const PhoneBook = () => {
  const dispatch = useDispatch();
  const filteredPhones = useSelector(filteredPhonesSelector);
  const isShowModalEdit = useSelector(isShowModalEditSelector);
  const isShowModalQuick = useSelector(isShowModalQuickSelector);
  const [selectedIdEdit, setSelectedIdEdit] = useState(null);
  const [selectedIdQuick, setSelectedIdQuick] = useState(null);
  const phoneEditedValue = useSelector((state) => getPhoneById(state, selectedIdEdit));
  const onCloseQuick = useCallback(() => dispatch(actions.showModalQuick(false)), [dispatch]);
  const onShow = useCallback(
    (id) => {
      dispatch(actions.showModalQuick(true));
      setSelectedIdQuick(id);
    },
    [setSelectedIdQuick],
  );
  const onCloseEdit = useCallback(() => dispatch(actions.showModalEdit(false)), [dispatch]);
  const onEdit = useCallback(
    (id) => {
      dispatch(actions.showModalEdit(true));
      setSelectedIdEdit(id);
    },
    [setSelectedIdEdit],
  );
  const onSubmitEdit = useCallback(
    (data) => {
      dispatch(
        actions.changePhone({
          ...data,
          selectedIdEdit,
          dateRegistration: data.dateRegistration.toString(),
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => dispatch(actions.loadPhones()), [dispatch]);
  return (
    <div className={styles.phoneBook}>
      <ul className={styles.wrapperPhoneBook}>
        {filteredPhones.map((item) => (
          <PhoneCard key={item.id} {...item} onEdit={onEdit} onShow={onShow} />
        ))}
      </ul>
      <Modal title="Режим редактирования" onClose={onCloseEdit} isOpen={isShowModalEdit}>
        <PhoneDataForm
          onClose={onCloseEdit}
          id={selectedIdEdit}
          isEdit
          phoneEditedValue={phoneEditedValue}
          onSubmit={onSubmitEdit}
        />
      </Modal>
      <Modal title="Быстрый просмотр" onClose={onCloseQuick} isOpen={isShowModalQuick}>
        <CardQuickView id={selectedIdQuick} />
      </Modal>
    </div>
  );
};
