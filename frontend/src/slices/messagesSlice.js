/* eslint no-param-reassign: ["error", { "props": false }] */

import axios from 'axios';

import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';
import routes from '../routes.js';

export const fetchMessagesData = createAsyncThunk(
  'messages/fetchMessagesData',
  async (getAuthHeader, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      const { messages } = data;
      return messages;
    } catch (error) {
      return rejectWithValue('Data not found');
    }
  },
);

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  messagesDataStatus: null,
  messagesDataError: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const restMessages = Object.values(state.entities)
          .filter((e) => e.channelId !== payload);
        messagesAdapter.setAll(state, restMessages);
      })
      .addCase(fetchMessagesData.pending, (state) => {
        state.messagesDataStatus = 'loading';
        state.messagesDataError = null;
      })
      .addCase(fetchMessagesData.fulfilled, (state, { payload }) => {
        messagesAdapter.addMany(state, payload);
        state.messagesDataStatus = 'idle';
        state.messagesDataError = null;
      })
      .addCase(fetchMessagesData.rejected, (state, { payload }) => {
        state.messagesDataStatus = 'failed';
        state.messagesDataError = payload;
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
