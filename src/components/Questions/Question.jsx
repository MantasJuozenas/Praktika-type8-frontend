import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import style from './Question.module.scss';
const baseUrl = process.env.REACT_APP_BASE_URL;

function Question({ data }) {
  const [answers, setAnswers] = useState([]);

  const history = useHistory();

  async function getAnswers() {
    const res = await fetch(`${baseUrl}/questions/${data.question_id}/answers`);
    const result = await res.json();
    setAnswers(result.data);
  }

  function handleClick(id) {
    history.push(`/question/${id}`);
  }

  useEffect(() => {
    if (!data) {
      return;
    }
    getAnswers();
  }, []);

  return (
    <>
      {data ? (
        <div onClick={() => handleClick(data.question_id)} className={style.questionCard}>
          <div className={style.leftSide}>
            <p>{data.q_like} likes</p>
            <p>{data.q_dislike} dislikes</p>
            <p>{answers.length} answers</p>
          </div>
          <div className={style.rightSide}>
            <div className={style.titleDiv}>
              <p className={style.title}>{data.q_title}</p>
              {data.q_edited ? (
                <span>Edited at {data.q_editet_time_stamp}</span>
              ) : (
                <span>Created at {data.q_time_stamp.split('T')[0]}</span>
              )}
            </div>
            <p className={style.text}>{data.q_body.length > 160 ? data.q_body.slice(0, 160) + '...' : data.q_body}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Question;
