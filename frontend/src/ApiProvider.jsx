import React from 'react';

import { ApiContext } from './contexts/index.js';

const ApiProvider = ({ api, children }) => {
  const {
    sendMessage,
    addNewChannel,
    deleteChannel,
    setNewChannelName,
  } = api;

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
