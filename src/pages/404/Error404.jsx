import React from 'react';

import styles from './Error404.module.scss';
import { Link } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className={styles.wrapperErrorPage}>
      <h2>К сожалению, такой страницы нет</h2>
      <Link to={'/'}>
        {' '}
        <h4>Вернуться на главную страницу</h4>{' '}
      </Link>
    </div>
  );
};
