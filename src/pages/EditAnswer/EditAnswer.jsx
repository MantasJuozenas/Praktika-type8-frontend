import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import style from './EditAnswer.module.scss';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AuthContext } from '../../components/store/authContext';

import * as Yup from 'yup';

const baseUrl = process.env.REACT_APP_BASE_URL;

const initValues = {
  title: '',
  body: '',
};

function EditAnswer() {
  const [error, setError] = useState(false);
  const [created, setCreated] = useState(false);
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  const history = useHistory();

  async function getQuestion(id) {
    const res = await fetch(`${baseUrl}/questions/${Number(id)}`);
    const result = await res.json();
    if (result.success) {
      const values = {
        body: result.data[0].q_body,
      };
      formik.setValues(values);
    }
  }

  useEffect(() => {
    getQuestion(id);
  }, []);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newQuestion = {
        a_body: values.body,
      };
      const resp = await fetch(`${baseUrl}/answer/${id}`, {
        method: 'PATCH',
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
          <p>Your answer was edited successfully</p>{' '}
          <button onClick={handleClick} className={style.button}>
            Back to Question
          </button>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <div className={style.infoDiv}>
            <h1>Edit your answer</h1>
            <button onClick={handleClick} className={style.button}>
              Back to Question
            </button>
          </div>
          <div className={style.inputs}>
            <div className={style.inputContainer}>
              <div className={style.passInfo}>
                <label htmlFor='body'>Answer Body</label>
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
            <button type='submit'>Edit Answer</button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditAnswer;
