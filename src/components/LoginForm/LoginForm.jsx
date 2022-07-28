import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../store/authContext';
import style from './LoginForm.module.scss';
import logo from '../../assets/stackLogin.png';
import googleLogo from '../../assets/googleLogo.png';
import githubLogo from '../../assets/githublogo.png';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newLogin = {
        username: values.email,
        password: values.password,
      };
      const resp = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogin),
      });
      console.log(resp);
      const result = await resp.json();
      if (result.success === false) {
        setError(result.msg);
        return;
      }
      login(result.token);
      history.push('/register');
      console.log(result);
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email cannot be empty.'),
      password: Yup.string()
        .required('Password cannot be empty.')
        .min(4, 'password should be at least 5 characters long')
        .max(10, 'Password should be 10 characters of less'),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <img className={style.img} src={logo} alt='LOGO' />
      <nav>
        <div className={`${style.google} ${style.box}`}>
          <img className={style.linkImg} src={googleLogo} alt='Google Logo' />
          Log in with Google
        </div>
        <div className={`${style.github} ${style.box}`}>
          <img className={style.linkImg} src={githubLogo} alt='Github Logo' />
          Log in with Github
        </div>
        <div className={`${style.facebook} ${style.box}`}>
          <i className={`${style.icon} fa fa-facebook-official`} aria-hidden='true'></i>
          Log in with Facebook
        </div>
      </nav>
      <div className={style.inputs}>
        <div className={style.inputContainer}>
          <label htmlFor='email'>Email</label>
          <input
            className={formik.touched.email && formik.errors.email ? `${style.errorInput}` : ''}
            type='text'
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className={style.errorMsg}>{formik.errors.email}</p>
          ) : (
            <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
          )}
        </div>
        <div className={style.inputContainer}>
          <div className={style.passInfo}>
            <label htmlFor='password'>Password</label>
            <p className={style.forgot}>Forgot password?</p>
          </div>
          <input
            className={formik.touched.password && formik.errors.password ? `${style.errorInput}` : ''}
            name='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className={style.errorMsg}>{formik.errors.password}</p>
          ) : (
            <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
          )}
        </div>
        <button type='submit'>Log in</button>
      </div>
      <p>
        Don't have an account?{' '}
        <Link className={style.signup} to={'/register'}>
          sign up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
