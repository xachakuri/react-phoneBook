import React from 'react';
import styles from './Navbar.module.scss';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.containerNavbar}>
        <h1 className="display-4">Телефонный справочник </h1>
      </div>
    </nav>
  );
};
