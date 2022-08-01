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

function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route exact path='/'>
          <QuestionsPage />
        </Route>
        <ProtectedRoute exact path={'/question/edit/:id'}>
          <EditQuestion />
        </ProtectedRoute>
        <Route path='/question/:id'>
          <SingleQuestion />
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
