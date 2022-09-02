import { selectors as channelsSelectors } from "./channelsSlice";
import { selectors as messagesSelectors } from "./messagesSlice";

export const getChannels = (state) => channelsSelectors.selectAll(state);
export const getCurrentChannelId = (state) => state.channels.currentChannelId;
export const getDataInfo = (state) => state.channels;

export const getMessages = (state) => messagesSelectors.selectAll(state);

export const getModalInfo = (state) => state.modals;
