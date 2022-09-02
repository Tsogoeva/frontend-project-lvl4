import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';

const runApp = async () => {
  const socket = io();
  const vdom = await init(socket);

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {vdom}
    </React.StrictMode>,
  );
};

runApp();
