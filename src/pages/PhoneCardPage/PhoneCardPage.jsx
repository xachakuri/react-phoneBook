import React from 'react';
import { useParams } from 'react-router-dom';
import { IndividualPhoneCard } from './IndividualPhoneCard/IndividualPhoneCard';

export const PhoneCardPage = () => {
  let { id } = useParams();
  return (
    <>
      <IndividualPhoneCard id={id} />
    </>
  );
};
