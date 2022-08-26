import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const ChatHeader = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat.header' });

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => Object.values(state.messages.entities));

  const { name } = channels.find(({ id }) => id === currentChannelId);
  const messageCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;
  const filteredName = filter.clean(name);

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${filteredName}`}</b>
      </p>
      <span className="text-muted">{t('count', { count: messageCount })}</span>
    </div>
  );
};

export default ChatHeader;
