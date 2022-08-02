import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../store/authContext';
import style from './Question.module.scss';
const baseUrl = process.env.REACT_APP_BASE_URL;

function SingleQuestionCard({ data, answer, like }) {
  const { isUserLoggedIn, token, setIsDeleted, isDeleted } = useContext(AuthContext);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const userId = localStorage.getItem('userId');
  const history = useHistory();

  async function handleLikeClick(id) {
    if (isUserLoggedIn) {
      const res = await fetch(`${baseUrl}/questions/like/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        like(true);
      }
      return;
    }
    setNotLoggedIn(true);
  }

  async function handleDelete(id) {
    const res = await fetch(`${baseUrl}/questions/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (result.success && answer !== 0) {
      const res = await fetch(`${baseUrl}/all/answers/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setIsDeleted(true);
        return;
      }
    }
    if (result.success) {
      setIsDeleted(true);
      return;
    }
  }

  async function handleDislikeClick(id) {
    if (isUserLoggedIn) {
      const res = await fetch(`${baseUrl}/questions/dislike/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        like(true);
      }
      return;
    }
    setNotLoggedIn(true);
  }

  function handleClick() {
    setIsDeleted(false);
    history.goBack();
  }

  return (
    <>
      {isDeleted ? (
        <div className={style.added}>
          <p>Your question was deleted successfully</p>
          <button onClick={handleClick} className={style.button}>
            Back to Questions
          </button>
        </div>
      ) : notLoggedIn ? (
        <div className={style.notLogged}>
          If you want to like or dislike a question please <Link to={'/login'}>Log in</Link>
        </div>
      ) : data ? (
        <div className={style.questionCard}>
          <div className={style.leftSide}>
            <p>
              <i onClick={() => handleLikeClick(data.question_id)} className='fa fa-arrow-up' aria-hidden='true'></i>
              {data.q_like}
            </p>
            <p>
              <i
                onClick={() => handleDislikeClick(data.question_id)}
                className='fa fa-arrow-down'
                aria-hidden='true'
              ></i>
              {data.q_dislike}
            </p>
            <p>{answer} answers</p>
          </div>
          <div className={style.rightSide}>
            <div className={style.titleDiv}>
              <p className={style.title}>{data.q_title}</p>
              <div className={style.edit}>
                {data.q_edited ? (
                  <span className={style.time}>Edited at {data.q_editet_time_stamp}</span>
                ) : (
                  <span className={style.time}>Created at {data.q_time_stamp.split('T')[0]}</span>
                )}
                {data.q_user_id == userId && (
                  <div>
                    <Link to={`/question/edit/${data.question_id}`}>
                      <i className='fa fa-pencil' aria-hidden='true'></i>
                    </Link>
                    <i onClick={() => handleDelete(data.question_id)} className='fa fa-trash-o' aria-hidden='true'></i>
                  </div>
                )}
              </div>
            </div>
            <p className={style.text}>{data.q_body}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default SingleQuestionCard;
