import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from './AuthProvider.jsx';
import { useAuth } from './hooks/index.js';
import routes from './routes.js';

import Chat from './components/ChatPage.jsx';
import Login from './components/LoginPage.jsx';
import SignUp from './components/SignUpPage.jsx';
import NotFound from './components/NotFoundPage.jsx';
import Header from './components/Header.jsx';

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="h-100 bg-light">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column vh-100">
            <Header />
            <Routes>
              <Route path={routes.signupPagePath()} element={<SignUp />} />
              <Route path={routes.loginPagePath()} element={<Login />} />
              <Route
                path={routes.chatPagePath()}
                element={(
                  <ChatRoute>
                    <Chat />
                  </ChatRoute>
                )}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  </AuthProvider>
);

export default App;
