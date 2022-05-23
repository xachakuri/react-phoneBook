import React from 'react';
import { PhoneBook, PhonebookActions } from './index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '../../redux/phones/selector';
import { Loading } from '../../components/Loading/Loading';

export const MainPage = () => {
  const isLoading = useSelector(isLoadingSelector);
  return (
    <>
      <PhonebookActions />
      <PhoneBook />
      <Loading isShow={isLoading} />
      <ToastContainer autoClose={2000} theme={'colored'} />
    </>
  );
};
