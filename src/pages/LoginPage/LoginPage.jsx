import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import style from './LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={style.container}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
