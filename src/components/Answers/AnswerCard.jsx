import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../pages/SingleQuestion/SingleQuestion.module.scss';

function AnswerCard({ data, handleLike, handleDislike, handleDelete, hasAnswers }) {
  const userId = localStorage.getItem('userId');
  return (
    <div className={style.answerCard}>
      <div className={style.leftSide}>
        <p>
          <i onClick={() => handleLike(data.answer_id)} className='fa fa-arrow-up' aria-hidden='true'></i>
          {data.a_like}
        </p>
        <p>
          <i onClick={() => handleDislike(data.answer_id)} className='fa fa-arrow-down' aria-hidden='true'></i>
          {data.a_dislike}
        </p>
      </div>
      <div className={style.rightSide}>
        <p className={style.text}>{data.a_body}</p>
        <div className={style.edit}>
          {data.a_edited ? (
            <span>Edited at {data.a_edited_time_stamp}</span>
          ) : (
            <span>Created at {data.a_time_stamp.split('T')[0]}</span>
          )}
          {hasAnswers
            ? data.a_user_id == userId && (
                <div>
                  <Link to={`/answers/edit/${data.answer_id}`}>
                    <i className='fa fa-pencil' aria-hidden='true'></i>
                  </Link>
                  <i onClick={() => handleDelete(data.answer_id)} className='fa fa-trash-o' aria-hidden='true'></i>
                </div>
              )
            : ''}
        </div>
      </div>
    </div>
  );
}

export default AnswerCard;
