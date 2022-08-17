import React, { useState } from "react";
import { Provider } from "react-redux";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
 // Outlet,
 // useLocation,
} from "react-router-dom";
import { ToastContainer as Toaster } from "react-toastify";

// import { Button, Navbar, Nav } from "react-bootstrap";
import useAuth from "./hooks/index.js";
import AuthContext from "./contexts/index.js";
import store from "./slices/index.js";
import routes from "./routes";

import Chat from "./components/ChatPage.jsx";
import Login from "./components/LoginPage.jsx";
import SignUp from "./components/SignUpPage.jsx";
import NotFound from "./components/NotFoundPage.jsx";
import Header from "./components/Header.jsx";

//import "./App.css";

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

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} />;
};


const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
        <Header />
          <Routes>
            <Route path={routes.signupPagePath()} element={<SignUp />} />
            <Route path={routes.loginPagePath()} element={<Login />} />
            <Route path={routes.chatPagePath()} element={(
              <ChatRoute>
                <Chat />
              </ChatRoute>
              )}
              />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
