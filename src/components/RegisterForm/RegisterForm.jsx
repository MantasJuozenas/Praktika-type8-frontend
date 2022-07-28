import style from './RegisterForm.module.scss';
import googleLogo from '../../assets/googleLogo.png';
import githubLogo from '../../assets/githublogo.png';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

const initValues = {
  username: '',
  email: '',
  password: '',
  name: '',
};

function RegisterForm() {
  const [register, setRegister] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newLogin = {
        email: values.email,
        username: values.name,
        password: values.password,
      };
      const resp = await fetch('http://localhost:3001/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogin),
      });
      const result = await resp.json();
      if (result.success === false) {
        setError(result.msg);
        return;
      }
      setRegister(true);
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email cannot be empty').email('Email should be valid'),
      password: Yup.string().required('Password cannot be empty').min(4, 'Password must be at least 4 characters'),
      name: Yup.string().required('Display name cannot be empty').min(4, 'Minimum 4 symbols'),
    }),
  });

  return (
    <>
      {register ? (
        <div className={style.successMessage}>
          <p>Jūsų registracija buvo sėkminga, galite prisijungti čia</p>
          <Link className={style.navLink} to={'/login'}>
            <button>Prisijungti</button>
          </Link>
        </div>
      ) : (
        <div className={style.register}>
          <div className={style.infoDiv}>
            <h1>Join the Stack Overflow community</h1>
            <p>Get unstuck — ask a question</p>
            <p>Unlock new privileges like voting and commenting</p>
            <p>Save your favorite tags, filters, and jobs</p>
            <p>Earn reputation and badges</p>
            <p className={style.regInfo}>
              Collaborate and share knowledge with a private group for FREE.{' '}
              <span className={style.forgot}>Get Stack Overflow for Teams free for up to 50 users.</span>
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className={style.form}>
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
                <label htmlFor='name'>Display name</label>
                <input
                  className={formik.touched.name && formik.errors.name ? `${style.errorInput}` : ''}
                  type='text'
                  name='name'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className={style.errorMsg}>{formik.errors.name}</p>
                ) : (
                  <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
                )}
              </div>
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
              <button type='submit'>Sign up</button>
              <p className={style.signupInfo}>
                By clicking “Sign up”, you agree to our <span className={style.forgot}>terms of service</span> ,{' '}
                <span className={style.forgot}>privacy policy</span> and{' '}
                <span className={style.forgot}>cookie policy</span>.
              </p>
            </div>
            <p>
              Already have an account?{' '}
              <Link className={style.signup} to={'/login'}>
                Log in
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default RegisterForm;
