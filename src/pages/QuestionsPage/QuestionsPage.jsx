import Aside from '../../components/Aside/Aside';
import Hero from '../../components/Hero/Hero';
import style from './QuestionPage.module.scss';

function QuestionsPage() {
  return (
    <div className={style.questionPage}>
      <div className={style.container}>
        <Aside />
        <Hero />
      </div>
    </div>
  );
}

export default QuestionsPage;
