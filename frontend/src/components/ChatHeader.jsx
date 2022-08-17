import React from "react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const channels = useSelector((state) => Object.values(state.channels.entities));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
 // const messages = useSelector(messageSelectors.selectAll);

  const currentChannel = channels.find(({ id }) => id === currentChannelId);
 // const messageCount = messages.filter((message) => console.log(message))

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${currentChannel.name}`}</b>
      </p>
      <span className="text-muted">0 сообщений</span>
    </div>
  )
};

export default ChatHeader;