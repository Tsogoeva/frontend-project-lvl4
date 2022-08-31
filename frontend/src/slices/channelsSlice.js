/* eslint no-param-reassign: ["error", { "props": false }] */

import axios from 'axios';

import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchChannelsData = createAsyncThunk(
  'channels/fetchChannelsData',
  async (getAuthHeader, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      const { channels, currentChannelId } = data;
      return { channels, currentChannelId };
    } catch (error) {
      return rejectWithValue('Data not found');
    }
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  channelsDataStatus: null,
  channelsDataError: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelsData.pending, (state) => {
        state.channelsDataStatus = 'loading';
        state.channelsDataError = null;
      })
      .addCase(fetchChannelsData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
        state.channelsDataStatus = 'idle';
        state.channelsDataError = null;
      })
      .addCase(fetchChannelsData.rejected, (state, { payload }) => {
        state.channelsDataStatus = 'failed';
        state.channelsDataError = payload;
      });
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
