import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
  Modal,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import { useAuth } from '../hooks/index.js';
import { fetchMessagesData } from '../slices/messagesSlice.js';
import { fetchChannelsData } from '../slices/channelsSlice.js';
import { closeModal } from '../slices/modalsSlice.js';
import getModal from './modals/index.js';

import ChatChannelsList from './ChatChannelsList.jsx';
import ChatHeader from './ChatHeader.jsx';
import ChatMessagesBox from './ChatMessagesBox.jsx';
import ChatMessageField from './ChatMessageField.jsx';

const Modals = ({ modalInfo, onHide }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={onHide} />;
};

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const rollbar = useRollbar();

  useEffect(() => {
    dispatch(fetchChannelsData(getAuthHeader));
    dispatch(fetchMessagesData(getAuthHeader));
  }, [dispatch, getAuthHeader]);

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { channelsDataStatus, channelsDataError } = useSelector((state) => state.channels);

  const messages = useSelector((state) => Object.values(state.messages.entities));
  const { messagesDataStatus, messagesDataError } = useSelector((state) => state.messages);

  const modalInfo = useSelector((state) => state.modals);
  const isOpen = useSelector((state) => state.modals.isOpen);

  if (channelsDataError || messagesDataError) {
    toast.warn(t('notices.loadedDataError'));
    rollbar.error(t('notices.loadedDataError'), channelsDataError || messagesDataError);
  }

  const onHide = () => {
    dispatch(closeModal());
  };

  const ChatComponents = () => (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">

        <ChatChannelsList
          channels={channels}
          currentChannelId={currentChannelId}
        />

        <Col className="p-0 h-100">

          <div className="d-flex flex-column h-100">
            <ChatHeader
              channels={channels}
              currentChannelId={currentChannelId}
              messages={messages}
            />
            <ChatMessagesBox
              currentChannelId={currentChannelId}
              messages={messages}
            />
            <ChatMessageField
              currentChannelId={currentChannelId}
            />
          </div>

        </Col>
      </Row>
      <Modal show={isOpen} centered onHide={onHide}>
        <Modals modalInfo={modalInfo} onHide={onHide} />
      </Modal>
    </Container>
  );

  return channelsDataStatus === 'idle' && messagesDataStatus === 'idle'
    ? <ChatComponents />
    : (
      <div className="d-flex align-items-center justify-content-center h-100 centered">
        <Spinner animation="border" variant="primary" />
      </div>
    );
};

export default Chat;
