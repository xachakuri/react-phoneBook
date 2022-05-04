import React from 'react';
import { PhoneBook, PhonebookActions } from './index';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '../../redux/selector';
import { Loading } from '../../components/Loading/Loading';

export const MainPage = () => {
  const isLoading = useSelector(isLoadingSelector);
  return (
    <>
      <PhonebookActions />
      <PhoneBook />
      <Loading loading={isLoading} size={50} />
    </>
  );
};
