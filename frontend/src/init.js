import React from "react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { Provider as StoreProvider } from "react-redux";
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import { io } from "socket.io-client";
import filter from "leo-profanity";

import store from "./slices/index.js";
import {
    addChannel,
    removeChannel,
    renameChannel,
    setCurrentChannelId,
    setDefaultChannelId,
} from "./slices/channelsSlice.js";
import { addMessage } from "./slices/messagesSlice.js";
import { SocketContext } from "./contexts/index.js";
import ru from "./locales/ru.js"

import App from "./App.jsx";

const SocketProvider = ({ children }) => {
    const socket = io();

    socket.on('newMessage', (payload) => {
        store.dispatch(addMessage(payload));
    });
    
    socket.on('newChannel', (payload) => {
        store.dispatch(addChannel(payload));
        store.dispatch(setCurrentChannelId(payload.id));
    });

    socket.on('renameChannel', ({ id, name }) => {
        store.dispatch(renameChannel({ id, changes: { name } }));
    });
    
    socket.on('removeChannel', ({ id }) => {
        store.dispatch(removeChannel(id));
        store.dispatch(setDefaultChannelId());
    });

    const sendMessage = (data, callback) => socket.emit('newMessage', data, callback);

    const addNewChannel = (name, callback) => {
        socket.emit('newChannel', { name }, callback);
    };
    
    const deleteChannel = (id, callback) => {
        socket.emit('removeChannel', { id }, callback);
    };
    
    const setNewChannelName = ({ id, name }, callback) => {
        socket.emit('renameChannel', { id, name }, callback);
    };

    return (
        <SocketContext.Provider value={{ sendMessage, addNewChannel, deleteChannel, setNewChannelName }}>
          {children}
        </SocketContext.Provider>
      );
};

const init = async () => {
    await i18n
      .use(initReactI18next)
      .init({
          lng: 'ru',
          fallbackLng: 'ru',
          debug: false,
          resources: {
            ru,
          },
          interpolation: {
            escapeValue: false,
          },
    });

    filter.add(filter.getDictionary('ru'));

    const rollbarConfig = {
        accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
        environment: process.env.NODE_ENV,
        captureUncaught: true,
        captureUnhandledRejections: true,
      };

    return (
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18n}>
              <StoreProvider store={store}>
                <SocketProvider>
                  <App />
                </SocketProvider>
              </StoreProvider>
            </I18nextProvider>
          </ErrorBoundary>
        </RollbarProvider>
    );
};

export default init;