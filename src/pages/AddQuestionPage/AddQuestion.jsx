import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import style from './AddQuestion.module.scss';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AuthContext } from '../../components/store/authContext';

import * as Yup from 'yup';

const baseUrl = process.env.REACT_APP_BASE_URL;

const initValues = {
  title: '',
  body: '',
};

function AddQuestion() {
  const [error, setError] = useState(false);
  const [created, setCreated] = useState(false);
  const { token } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');
  const history = useHistory();

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newQuestion = {
        q_title: values.title,
        q_body: values.body,
        q_user_id: userId,
      };
      const resp = await fetch(`${baseUrl}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newQuestion),
      });
      const result = await resp.json();
      if (result.success) {
        setCreated(true);
      }
      if (result.success === false) {
        setError(result.msg);
        return;
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title cannot be empty.'),
      body: Yup.string().required('Body cannot be empty.').min(4, 'Should be at least 4 characters long'),
    }),
  });

  function handleClick() {
    history.goBack();
  }
  return (
    <>
      {created ? (
        <div className={style.added}>
          <p>Your question was created successfully</p>{' '}
          <button onClick={handleClick} className={style.button}>
            Back to Questions
          </button>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <div className={style.infoDiv}>
            <h1>Ask a question</h1>
            <button onClick={handleClick} className={style.button}>
              Back to Question
            </button>
          </div>
          <div className={style.inputs}>
            <div className={style.inputContainer}>
              <label htmlFor='title'>Question Title</label>
              <input
                className={formik.touched.title && formik.errors.title ? `${style.errorInput}` : ''}
                type='text'
                name='title'
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <p className={style.errorMsg}>{formik.errors.title}</p>
              ) : (
                <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
              )}
            </div>
            <div className={style.inputContainer}>
              <div className={style.passInfo}>
                <label htmlFor='body'>Question Body</label>
              </div>
              <textarea
                className={formik.touched.body && formik.errors.body ? `${style.errorInput}` : ''}
                name='body'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.body}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.body && formik.errors.body ? (
                <p className={style.errorMsg}>{formik.errors.body}</p>
              ) : (
                <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
              )}
            </div>
            <button type='submit'>Post Question</button>
          </div>
        </form>
      )}
    </>
  );
}

export default AddQuestion;
