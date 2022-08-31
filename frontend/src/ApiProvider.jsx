import React from 'react';

import { ApiContext } from './contexts/index.js';
import initSocket from './socket.js';

const ApiProvider = ({ children }) => {
  const {
    sendMessage,
    addNewChannel,
    deleteChannel,
    setNewChannelName,
  } = initSocket();

  return (
    <ApiContext.Provider
      value={{
        sendMessage, addNewChannel, deleteChannel, setNewChannelName,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
