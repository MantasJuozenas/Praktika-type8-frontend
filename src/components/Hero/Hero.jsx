import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Hero.module.scss';

function Hero() {
  const [activeFilter, setActiveFilter] = useState(null);
  function handleClick(e) {
    console.log(e.target.textContent);
    switch (e.target.textContent) {
      case 'Date':
        setActiveFilter('Date');
        break;
      case 'Answered':
        setActiveFilter('Answered');
        break;
      case 'Unanswered':
        setActiveFilter('Unanswered');
        break;
      default:
        break;
    }
  }

  return (
    <div className={style.hero}>
      <div className={style.questionInfo}>
        <h2>All Questions</h2>
        <Link to={'/askquestion'}>
          <button className={style.ask}>Ask a question</button>
        </Link>
      </div>
      <div className={style.filter}>
        <p>100 questions</p>
        <div className={style.buttons}>
          <div className={style.filterOptions}>
            <button className={activeFilter === 'Date' ? `${style.active}` : ''} onClick={(e) => handleClick(e)}>
              Date
            </button>
            <button
              onClick={(e) => handleClick(e)}
              className={`${style.borders} ${activeFilter === 'Answered' ? `${style.active}` : ''}`}
            >
              Answered
            </button>
            <button className={activeFilter === 'Unanswered' ? `${style.active}` : ''} onClick={(e) => handleClick(e)}>
              Unanswered
            </button>
          </div>
          <button className={style.filterBtn}>Filter</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
