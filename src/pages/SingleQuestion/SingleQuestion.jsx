import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SingleQuestionCard from '../../components/Questions/SingleQuestionCard';
import { AuthContext } from '../../components/store/authContext';

import style from './SingleQuestion.module.scss';
const baseUrl = process.env.REACT_APP_BASE_URL;

function SingleQuestion() {
  const [question, setQuestion] = useState([]);
  const [likeDislike, setLikeDislike] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [hasAnswers, setHasAnswers] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const { id } = useParams();
  const { isUserLoggedIn } = useContext(AuthContext);

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
      return;
    }
    setHasAnswers(true);
    setAnswers(result.data);
  }

  useEffect(() => {
    getAnswers(id);
    getQuestion(id);
    setLikeDislike(false);
  }, [id, likeDislike]);

  return (
    <>
      {question ? (
        <div className={style.bgc}>
          <div className={style.questionPage}>
            <div className={style.container}>
              <div className={style.hero}>
                <div className={style.questionInfo}>
                  <h2>All Answers</h2>
                  {isUserLoggedIn ? (
                    <Link to={'/askquestion'}>
                      <button className={style.ask}>Type answer</button>
                    </Link>
                  ) : (
                    <p>
                      If you want to write an answer please <Link to={'/login'}>log in</Link>
                    </p>
                  )}
                </div>
              </div>
              {question ? <SingleQuestionCard like={setLikeDislike} data={question[0]} answer={answers.length} /> : ''}
            </div>
            <div className={style.answer}>{hasAnswers ? <h2>Answers</h2> : <h2>No Answers</h2>}</div>
            {notLoggedIn ? (
              <div className={style.notLogged}>
                If you want to like or dislike an answer please <Link to={'/login'}>Log in</Link>
              </div>
            ) : (
              answers.map((answer, i) => {
                return (
                  <div key={i} className={style.answerCard}>
                    <div className={style.leftSide}>
                      <p>
                        <i
                          onClick={() => handleLikeClick(answer.answer_id)}
                          className='fa fa-arrow-up'
                          aria-hidden='true'
                        ></i>
                        {answer.a_like}
                      </p>
                      <p>
                        <i
                          onClick={() => handleDislikeClick(answer.answer_id)}
                          className='fa fa-arrow-down'
                          aria-hidden='true'
                        ></i>
                        {answer.a_dislike}
                      </p>
                    </div>
                    <div className={style.rightSide}>
                      <p className={style.text}>{answer.a_body}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default SingleQuestion;
