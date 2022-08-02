import React from 'react';
import Question from './Question';

function QuestionList({ questions, onClick }) {
  return (
    <>
      {questions.length === 0
        ? ''
        : questions.map((question) => <Question key={question.question_id} data={question} onClick={onClick} />)}
    </>
  );
}

export default QuestionList;
