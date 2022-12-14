import { useContext } from 'react';
import { Route } from 'react-router';

import { Link } from 'react-router-dom';

import style from './LoginForm/LoginForm.module.scss';
import { AuthContext } from './store/authContext';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useContext(AuthContext);
  const { children, ...rest } = props;

  return (
    <Route {...rest}>
      {isUserLoggedIn ? (
        children
      ) : (
        <div className={style.successMessage}>
          <p>Jūs nesate prisijungę, norėdami pamatyti daugiau prisijunkite!</p>
          <Link className={style.navLink} to={'/login'}>
            <button>Prisijungti</button>
          </Link>
        </div>
      )}
    </Route>
  );
}

export default ProtectedRoute;
