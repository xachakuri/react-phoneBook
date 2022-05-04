import React from 'react';
import { ClipLoader } from 'react-spinners';
import PropTypes from 'prop-types';

import styles from './Loading.module.scss';
import clsx from 'clsx';

export const Loading = ({ loading, size }) => {
  return (
    <div className={clsx(styles.loading, { [styles.activeLoading]: loading })}>
      <ClipLoader loading={loading} size={size} />
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.number,
};
