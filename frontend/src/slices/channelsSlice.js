/* eslint no-param-reassign: ["error", { "props": false }] */

import axios from 'axios';

import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (getAuthHeader, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      return data;
    } catch (error) {
      return rejectWithValue('Data not found');
    }
  },
);

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  dataStatus: null,
  dataError: null,
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
      .addCase(fetchData.pending, (state) => {
        state.dataStatus = 'loading';
        state.dataError = null;
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        channelsAdapter.addMany(state, channels);
        state.currentChannelId = currentChannelId;
        state.dataStatus = 'idle';
        state.dataError = null;
      })
      .addCase(fetchData.rejected, (state, { payload }) => {
        state.dataStatus = 'failed';
        state.dataError = payload;
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
