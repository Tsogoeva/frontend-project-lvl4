import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { removeChannel } from "./channelsSlice.js";

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
          });
      },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
