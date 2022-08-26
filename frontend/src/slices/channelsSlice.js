/* eslint no-param-reassign: ["error", { "props": false }] */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: channelsAdapter.removeOne,
    removeChannels: channelsAdapter.removeMany,
    renameChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannelId: (state) => {
      state.currentChannelId = defaultChannelId;
    },
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
  addChannel,
  addChannels,
  removeChannel,
  removeChannels,
  renameChannel,
  setCurrentChannelId,
  setDefaultChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
