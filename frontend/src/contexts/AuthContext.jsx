import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem('userId'));
  const [loggedIn, setLoggedIn] = useState(!!token);

  const logIn = (data) => {
    const currToken = JSON.stringify(data);
    localStorage.setItem('userId', currToken);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getAuthHeader = () => (loggedIn
    ? { Authorization: `Bearer ${token.token}` }
    : {});

  return (
    <AuthContext.Provider
      value={{
        loggedIn, logIn, logOut, getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
