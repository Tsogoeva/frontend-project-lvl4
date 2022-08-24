import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import filter from "leo-profanity";

const ChatMessagesBox = () => {
    const messages = useSelector((state) => Object.values(state.messages.entities))
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);
    
    const currentChannelMessages = messages.filter((message) => message.channelId === currentChannelId);

    const messagesBoxRef = useRef(null);
    useEffect(() => {
        messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    });

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messagesBoxRef}>
            {currentChannelMessages.map(({ body, username, id }) => {
                const filteredBody = filter.clean(body);

                return (
                <div key={id} className="text-break mb-2">
                    <b>{username}</b>
                    {`: ${filteredBody}`}
                </div>
                );
            })}
        </div>
    )
};

export default ChatMessagesBox;
