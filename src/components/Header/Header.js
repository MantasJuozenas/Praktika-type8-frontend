import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/stack.png';
import { AuthContext } from '../store/authContext';
import styles from './Header.module.scss';

function Header() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoInfo}>
          <img className={styles.logo} src={logo} alt='LOGO' />
          <NavLink to={'/home'} className={styles.navLink}>
            Questions
          </NavLink>
        </div>
        <div className={styles.searchDiv}>
          <input className={`${styles.search} ${styles.mg5}`} type='text' placeholder='Search' />
          {!isUserLoggedIn ? (
            <>
              <NavLink to={'/login'}>
                <button className={`${styles.mg5} ${styles.login}`}>Login</button>
              </NavLink>
              <NavLink to={'/register'}>
                <button className={`${styles.mg5} ${styles.signup}`}>Sign up</button>
              </NavLink>
            </>
          ) : (
            <NavLink to={'/login'}>
              <button className={`${styles.mg5} ${styles.login}`}>Logout</button>
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
