import React from 'react';
import { PhoneBook, PhonebookActions } from './index';

export const MainPage = () => {
  return (
    <>
      <PhonebookActions />
      <PhoneBook />
    </>
  );
};
