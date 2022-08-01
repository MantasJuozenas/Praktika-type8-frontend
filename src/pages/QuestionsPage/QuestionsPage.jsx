import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionList from '../../components/Questions/QuestionList';
import { AuthContext } from '../../components/store/authContext';
import style from './QuestionPage.module.scss';
const baseUrl = process.env.REACT_APP_BASE_URL;

function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const { questionCount, isUserLoggedIn } = useContext(AuthContext);

  async function getQuestions() {
    const res = await fetch(`${baseUrl}/questions`);
    const { data } = await res.json();
    setQuestions(data);
    questionCount(data.length);
  }

  async function getAnswers() {
    const res = await fetch(`${baseUrl}/answers`);
    const { data } = await res.json();
    if (data) {
      setAnswers(data);
    }
  }

  function handleClick(e) {
    let newData = [...questions];
    switch (e.target.textContent) {
      case 'Newest':
        setActiveFilter('Newest');
        setFiltered(newData.reverse());
        break;
      case 'Answered':
        setActiveFilter('Answered');
        const filteredAnswers = answers.map((a) => a.a_question_id);
        const answered = newData.filter((q) => filteredAnswers.includes(q.question_id));
        setFiltered(answered);
        break;
      case 'Unanswered':
        setActiveFilter('Unanswered');
        const filteredNoAnswers = answers.map((a) => a.a_question_id);
        const noAnswers = newData.filter((q) => !filteredNoAnswers.includes(q.question_id));
        setFiltered(noAnswers);
        break;
      case 'All Questions':
        setActiveFilter(false);
        setFiltered(newData);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    getQuestions();
    getAnswers();
  }, [activeFilter]);

  return (
    <div className={style.bgc}>
      <div className={style.questionPage}>
        <div className={style.container}>
          <div className={style.hero}>
            <div className={style.questionInfo}>
              <h2>All Questions</h2>
              {isUserLoggedIn ? (
                <Link to={'/askquestion'}>
                  <button className={style.ask}>Ask a question</button>
                </Link>
              ) : (
                <p>
                  If you want to write a question please <Link to={'/login'}>log in</Link>
                </p>
              )}
            </div>
            <div className={style.filter}>
              <p>{filtered ? filtered.length : localStorage.getItem('question-counter')} questions</p>
              <div className={style.buttons}>
                <div className={style.filterOptions}>
                  <button className={style.borders} onClick={(e) => handleClick(e)}>
                    All Questions
                  </button>
                  <button
                    className={activeFilter === 'Newest' ? `${style.active}` : ''}
                    onClick={(e) => handleClick(e)}
                  >
                    Newest
                  </button>
                  <button
                    onClick={(e) => handleClick(e)}
                    className={`${style.borders} ${activeFilter === 'Answered' ? `${style.active}` : ''}`}
                  >
                    Answered
                  </button>
                  <button
                    className={activeFilter === 'Unanswered' ? `${style.active}` : ''}
                    onClick={(e) => handleClick(e)}
                  >
                    Unanswered
                  </button>
                </div>
              </div>
            </div>
          </div>
          {filtered ? <QuestionList questions={filtered} /> : <QuestionList questions={questions} />}
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;
