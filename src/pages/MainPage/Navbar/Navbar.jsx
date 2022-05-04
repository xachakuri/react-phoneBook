import React from 'react';

import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.containerNavbar}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 className="display-4">Телефонный справочник </h1>
        </Link>
      </div>
    </nav>
  );
};
