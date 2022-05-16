import React from 'react';

import styles from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className={styles.wrapperErrorPage}>
      <h2>К сожалению такой страницы нет</h2>
      <Link to={'/'}>
        {' '}
        <h4>Вернуться обратно</h4>{' '}
      </Link>
    </div>
  );
};
