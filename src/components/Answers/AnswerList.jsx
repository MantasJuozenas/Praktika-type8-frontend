import React from 'react';
import AnswerCard from './AnswerCard';

function AnswerList({ data, handleLike, handleDislike, handleDelete, hasAnswers }) {
  return data.map((answer, i) => {
    return (
      <AnswerCard
        key={i}
        data={answer}
        handleLike={handleLike}
        handleDislike={handleDislike}
        handleDelete={handleDelete}
        hasAnswers={hasAnswers}
      />
    );
  });
}

export default AnswerList;
