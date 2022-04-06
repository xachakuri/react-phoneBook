import React from 'react';
import { Navbar, PhoneBook, PhonebookActions } from './index';

export const PhonePage = () => {
  return (
    <>
      <Navbar />
      <PhonebookActions />
      <PhoneBook />
    </>
  );
};
