/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel, fetchData } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

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
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        messagesAdapter.addMany(state, messages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
