import React, { createContext, useContext } from 'react';

export const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);

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
