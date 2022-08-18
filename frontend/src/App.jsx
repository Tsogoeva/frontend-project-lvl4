import React from "react";
import { Provider } from "react-redux";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer as Toaster } from "react-toastify";

// import { Button, Navbar, Nav } from "react-bootstrap";
import AuthProvider from "./providers/AuthProvider.jsx";
import SocketProvider from "./providers/SocketProvider.jsx";

import { useAuth } from "./hooks/index.js";
import store from "./slices/index.js";
import routes from "./routes.js";

import Chat from "./components/ChatPage.jsx";
import Login from "./components/LoginPage.jsx";
import SignUp from "./components/SignUpPage.jsx";
import NotFound from "./components/NotFoundPage.jsx";
import Header from "./components/Header.jsx";

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  return auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column vh-100">
        <Header />
          <Routes>
            <Route path={routes.signupPagePath()} element={<SignUp />} />
            <Route path={routes.loginPagePath()} element={<Login />} />
            <Route path={routes.chatPagePath()} element={(
              <ChatRoute>
                <SocketProvider>
                  <Chat />
                </SocketProvider>
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
