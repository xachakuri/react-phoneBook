import React from 'react';
import { ClipLoader } from 'react-spinners';

import styles from './Loading.module.scss';
import PropTypes from 'prop-types';

export const Loading = ({ isShow }) => {
  if (!isShow) return null;
  return (
    <div className={styles.loading}>
      <ClipLoader size={100} />
    </div>
  );
};
Loading.propTypes = {
  isShow: PropTypes.bool,
};
