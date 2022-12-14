import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  token: '',
  questionCount() {},
  isDeleted: '',
  setIsDeleted() {},
  searchValue: '',
  setSearchValue() {},
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token-React'));

  const isUserLoggedIn = !!token;
  const [isDeleted, setIsDeleted] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  function login(userToken, userId) {
    setToken(userToken);
    localStorage.setItem('token-React', userToken);
    localStorage.setItem('userId', userId);
  }
  function logout() {
    setToken(null);
    localStorage.removeItem('token-React');
    localStorage.removeItem('question-counter');
    localStorage.removeItem('userId');
  }

  function questionCount(num) {
    localStorage.setItem('question-counter', num);
  }

  const ctx = {
    login,
    logout,
    isUserLoggedIn,
    token,
    questionCount,
    isDeleted,
    setIsDeleted,
    searchValue,
    setSearchValue,
  };
  return <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;

// custom hook for context
export function useAuthCtx() {
  return useContext(AuthContext);
}
