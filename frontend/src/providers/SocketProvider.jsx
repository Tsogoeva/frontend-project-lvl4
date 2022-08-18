import React from "react";
import { io } from "socket.io-client";

import store from "../slices/index.js";
import {
    addChannel,
    removeChannel,
    renameChannel,
    setCurrentChannelId,
} from "../slices/channelsSlice.js";
import { addMessage } from "../slices/messagesSlice.js";
import { SocketContext } from "../contexts/index.js";

const SocketProvider = ({ children }) => {
    const socket = io();

    socket.on('newMessage', (payload) => {
        store.dispatch(addMessage(payload));
    });
    
    socket.on('newChannel', (payload) => {
        store.dispatch(addChannel(payload));
    });

    socket.on('renameChannel', ({ id, name }) => {
        store.dispatch(renameChannel({ id, changes: { name } }));
    });
    
    socket.on('removeChannel', ({ id }) => {
        store.dispatch(removeChannel(id));
        store.dispatch(setCurrentChannelId(id));
    });

    const sendMessage = (data) => socket.emit('newMessage', data);

    const addNewChannel = (name, callback) => {
        socket.emit('newChannel', { name }, ({ data }) => {
          store.dispatch(setCurrentChannelId(data.id));
          callback();
        });
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

export default SocketProvider;