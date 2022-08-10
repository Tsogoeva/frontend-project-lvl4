import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React, { useState } from "react";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
 // useLocation,
} from "react-router-dom";
import { ToastContainer as Toaster } from "react-toastify";

// import { Button, Navbar, Nav } from "react-bootstrap";
import useAuth from "./hooks/index.js";
import AuthContext from "./contexts/index.js";

import Chat from "./pages/ChatPage.jsx";
import Login from "./pages/LoginPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import NotFound from "./pages/NotFoundPage.jsx";
import Header from "./components/Header.jsx";

import routes from "./routes";

import "./App.css";

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('userId') ? true : false
    );

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};


const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
      <Header />
        <Routes>
          <Route path={routes.signupPagePath()} element={<SignUp />} />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.chatPagePath()} element={<ChatRoute />}>
            <Route path="" element={<Chat />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  </AuthProvider>
);

export default App;
