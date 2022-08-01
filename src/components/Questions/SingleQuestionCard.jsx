import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/authContext';
import style from './Question.module.scss';
const baseUrl = process.env.REACT_APP_BASE_URL;

function SingleQuestionCard({ data, answer, like }) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const userId = localStorage.getItem('userId');

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
  return (
    <>
      {notLoggedIn ? (
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
                  <span>Edited at {data.q_editet_time_stamp}</span>
                ) : (
                  <span>Created at {data.q_time_stamp.split('T')[0]}</span>
                )}
                {data.q_user_id == userId && (
                  <Link to={`/question/edit/${data.question_id}`}>
                    <i className='fa fa-pencil' aria-hidden='true'></i>
                  </Link>
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
