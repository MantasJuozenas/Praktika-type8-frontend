import Header from './components/Header/Header';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';

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
        {/* <ProtectedRoute path={'/addpost'}>
          <AddPost />
        </ProtectedRoute>
        <ProtectedRoute exact path={'/'}>
          <HomePage />
        </ProtectedRoute> */}
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
