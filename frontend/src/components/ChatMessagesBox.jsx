import React from "react";
import { useSelector } from "react-redux";

const ChatMessagesBox = () => {
    const messages = useSelector((state) => Object.values(state.messages.entities))
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);

    const currentChannelMessages = messages.filter((message) => message.channelId === currentChannelId);

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5">
            {currentChannelMessages.map(({ body, username, id }) => (
                <div key={id} className="text-break mb-2">
                    <b>{username}</b>
                    {`: ${body}`}
                </div>
            ))}
        </div>
    )
};

export default ChatMessagesBox;
