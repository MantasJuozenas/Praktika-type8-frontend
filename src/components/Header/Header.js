import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/stack.png';
import { AuthContext } from '../store/authContext';
import styles from './Header.module.scss';

function Header({ onChange }) {
  const { isUserLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoInfo}>
          <img className={styles.logo} src={logo} alt='LOGO' />
          <NavLink to={'/'} className={styles.navLink}>
            Questions
          </NavLink>
        </div>
        <div className={styles.searchDiv}>
          <div className={styles.inputGroup}>
            <label htmlFor='search' className={styles.id}>
              <i className={`${styles.icon} fa fa-search`}></i>
            </label>
            <input
              className={`${styles.search} ${styles.mg5}`}
              onChange={onChange}
              name='search'
              type='text'
              placeholder='Search'
            />
          </div>
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
            <button onClick={logout} className={`${styles.mg5} ${styles.login}`}>
              Logout
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
