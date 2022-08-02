import { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import SingleQuestionCard from '../../components/Questions/SingleQuestionCard';
import { AuthContext } from '../../components/store/authContext';
import AnswerList from '../../components/Answers/AnswerList';

import style from './SingleQuestion.module.scss';
const baseUrl = process.env.REACT_APP_BASE_URL;

function SingleQuestion() {
  const [question, setQuestion] = useState(false);
  const [likeDislike, setLikeDislike] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [hasAnswers, setHasAnswers] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const { id } = useParams();
  const { isUserLoggedIn, isDeleted, setIsDeleted, token } = useContext(AuthContext);
  const history = useHistory();

  async function handleLikeClick(id) {
    if (isUserLoggedIn === true) {
      const res = await fetch(`${baseUrl}/answer/like/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setLikeDislike(true);
      }
      return;
    }
    setNotLoggedIn(true);
  }

  async function handleDislikeClick(id) {
    if (isUserLoggedIn === true) {
      const res = await fetch(`${baseUrl}/answer/dislike/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        setLikeDislike(true);
      }
      return;
    }
    setNotLoggedIn(true);
  }

  async function getQuestion(id) {
    const res = await fetch(`${baseUrl}/questions/${id}`);
    const { data } = await res.json();
    setQuestion(data);
  }

  async function getAnswers(id) {
    const res = await fetch(`${baseUrl}/questions/${id}/answers`);
    const result = await res.json();
    if (result.data.length === 0) {
      setHasAnswers(false);
      setAnswers(result.data);
      return;
    }
    setAnswers(result.data);
    setHasAnswers(true);
  }

  function handleClick() {
    setIsDeleted(false);
    history.push('/');
  }

  async function handleDelete(id) {
    const res = await fetch(`${baseUrl}/answer/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (result.success) {
      setLikeDislike(true);
      return;
    }
  }

  useEffect(() => {
    getAnswers(id);
    getQuestion(id);
    setLikeDislike(false);
  }, [id, likeDislike]);

  return (
    <>
      {isDeleted ? (
        <div className={style.added}>
          <p>Your question was deleted successfully</p>
          <button onClick={handleClick} className={style.button}>
            Back to Questions
          </button>
        </div>
      ) : (
        question && (
          <div className={style.bgc}>
            <div className={style.questionPage}>
              <div className={style.container}>
                <div className={style.hero}>
                  <div className={style.questionInfo}>
                    <h2>All Answers</h2>
                    {isUserLoggedIn ? (
                      <Link to={`/answers/${id}`}>
                        <button className={style.ask}>Type answer</button>
                      </Link>
                    ) : (
                      <p>
                        If you want to write an answer please <Link to={'/login'}>log in</Link>
                      </p>
                    )}
                  </div>
                </div>
                <SingleQuestionCard like={setLikeDislike} data={question[0]} answer={answers.length} />
              </div>
              <div className={style.answer}>{hasAnswers ? <h2>Answers</h2> : <h2>No Answers</h2>}</div>
              {notLoggedIn ? (
                <div className={style.notLogged}>
                  If you want to like or dislike an answer please <Link to={'/login'}>Log in</Link>
                </div>
              ) : (
                hasAnswers && (
                  <AnswerList
                    data={answers}
                    handleLike={handleLikeClick}
                    handleDislike={handleDislikeClick}
                    handleDelete={handleDelete}
                    hasAnswers={hasAnswers}
                  />
                )
              )}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default SingleQuestion;
