import React, { useState } from "react";
import { AuthContext } from "../contexts/index.js";

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
      <AuthContext.Provider value={{ loggedIn, logIn, logOut, getAuthHeader }}>
        {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;
