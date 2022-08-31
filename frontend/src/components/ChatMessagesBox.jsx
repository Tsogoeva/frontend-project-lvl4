import React, { useRef, useEffect } from 'react';
import filter from 'leo-profanity';

const ChatMessagesBox = ({ currentChannelId, messages }) => {
  const currentChannelMessages = messages
    .filter((message) => message.channelId === currentChannelId);

  const messagesBoxRef = useRef(null);
  useEffect(() => {
    messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
  });

  return (
    <div
      id="messages-box"
      className="chat-messages overflow-auto px-5"
      ref={messagesBoxRef}
    >
      {currentChannelMessages.map(({ body, username, id }) => {
        const censoredBody = filter.clean(body);

        return (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            {`: ${censoredBody}`}
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessagesBox;
