import Header from './components/Header/Header';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';
import SingleQuestion from './pages/SingleQuestion/SingleQuestion';
import AddQuestion from './pages/AddQuestionPage/AddQuestion';
import ProtectedRoute from './components/protectedRoute';
import EditQuestion from './pages/EditQuestion/EditQuestion';
import AddAnswer from './pages/AddAnswer/AddAnswer';
import EditAnswer from './pages/EditAnswer/EditAnswer';
import { useContext, useState } from 'react';
import { AuthContext } from './components/store/authContext';

function App() {
  const [searchValues, setSearchValue] = useState('');
  const { searchValue } = useContext(AuthContext);

  function onChange(e = '') {
    setSearchValue(e.target.value);
  }

  function resetInput() {
    setSearchValue(searchValue);
  }

  return (
    <div className='App'>
      <Header onChange={onChange} value={searchValues} onClick={resetInput} />
      <Switch>
        <ProtectedRoute exact path={'/answers/edit/:id'}>
          <EditAnswer />
        </ProtectedRoute>
        <ProtectedRoute exact path={'/question/edit/:id'}>
          <EditQuestion />
        </ProtectedRoute>
        <ProtectedRoute path={'/answers/:id'}>
          <AddAnswer />
        </ProtectedRoute>
        <Route path='/question/:id'>
          <SingleQuestion />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route exact path='/'>
          <QuestionsPage searchValue={searchValues} onClick={resetInput} />
        </Route>
        <ProtectedRoute path={'/askquestion'}>
          <AddQuestion />
        </ProtectedRoute>
        <Route path='*'>
          <div className='container'>
            <h2>Page not found</h2>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
