import React from "react";
import { useSelector } from "react-redux";

const ChatHeader = () => {
  const channels = useSelector((state) => Object.values(state.channels.entities));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => Object.values(state.messages.entities));

  const { name } = channels.find(({ id }) => id === currentChannelId);
  const messageCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${name}`}</b>
      </p>
      <span className="text-muted">{`${messageCount} сообщений`}</span>
    </div>
  )
};

export default ChatHeader;