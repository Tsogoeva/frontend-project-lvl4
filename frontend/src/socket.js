import {
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannelId,
  setDefaultChannelId,
} from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';
import store from './slices/index.js';

const initSocket = (socket) => {
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

  const sendMessage = (data, callback) => {
    socket.emit('newMessage', data, callback);
  };

  const addNewChannel = (name, callback) => {
    socket.emit('newChannel', { name }, callback);
  };

  const deleteChannel = (id, callback) => {
    socket.emit('removeChannel', { id }, callback);
  };

  const setNewChannelName = ({ id, name }, callback) => {
    socket.emit('renameChannel', { id, name }, callback);
  };

  return {
    sendMessage,
    addNewChannel,
    deleteChannel,
    setNewChannelName,
  };
};

export default initSocket;
