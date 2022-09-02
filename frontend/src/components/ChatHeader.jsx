import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';

import {
  getChannels,
  getCurrentChannelId,
  getMessages,
} from '../slices/selectors.js';

const ChatHeader = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat.header' });

  const channels = useSelector(getChannels);
  const currentChannelId = useSelector(getCurrentChannelId);
  const messages = useSelector(getMessages);

  const { name } = channels.find(({ id }) => id === currentChannelId);
  const censoredName = filter.clean(name);
  const messageCount = messages.filter(({ channelId }) => channelId === currentChannelId).length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${censoredName}`}</b>
      </p>
      <span className="text-muted">{t('count', { count: messageCount })}</span>
    </div>
  );
};

export default ChatHeader;
