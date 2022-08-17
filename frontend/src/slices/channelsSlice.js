import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
    currentChannelId: null
});

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
        removeChannel: channelsAdapter.removeOne,
        removeChannels: channelsAdapter.removeMany,
        setCurrentChannelId: (state, { payload }) => {
            console.log(state.currentChannelId)
            state.currentChannelId = payload;
        },
    }
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {
    addChannel,
    addChannels,
    removeChannel,
    removeChannels,
    setCurrentChannelId
} = channelsSlice.actions;

export default channelsSlice.reducer;
