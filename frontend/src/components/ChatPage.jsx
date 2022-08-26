import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Spinner,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import axios from 'axios';

import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import { addChannels, setCurrentChannelId } from '../slices/channelsSlice.js';
import { addMessages } from '../slices/messagesSlice.js';
import getModal from './modals/index.js';

import ChatChannelsList from './ChatChannelsList.jsx';
import ChatHeader from './ChatHeader.jsx';
import ChatMessagesBox from './ChatMessagesBox.jsx';
import ChatMessageField from './ChatMessageField.jsx';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const Chat = () => {
  const { t } = useTranslation();
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();
  const rollbar = useRollbar();

  const [loadedData, setLoadedData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
        const {
          currentChannelId,
          channels,
          messages,
        } = data;

        dispatch(addChannels(channels));
        dispatch(setCurrentChannelId(currentChannelId));
        dispatch(addMessages(messages));

        setLoadedData(true);
      } catch (error) {
        toast.warn(t('notices.loadedDataError'));
        rollbar.error(t('notices.loadedDataError'), error);
      }
    };

    fetchData();
  }, [dispatch, getAuthHeader, t, rollbar]);

  const [modalInfo, setModalInfo] = useState({ type: null, channelInfo: null });
  const hideModal = () => setModalInfo({ type: null, channelInfo: null });
  const showModal = (type, channelInfo = null) => setModalInfo({ type, channelInfo });

  const ChatComponents = () => (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">

        <ChatChannelsList showModal={showModal} />

        <Col className="p-0 h-100">

          <div className="d-flex flex-column h-100">
            <ChatHeader />
            <ChatMessagesBox />
            <ChatMessageField />
          </div>

        </Col>
      </Row>
      {renderModal({ modalInfo, hideModal })}
    </Container>

  );

  return loadedData ? <ChatComponents />
    : (
      <div className="d-flex align-items-center justify-content-center h-100 centered">
        <Spinner animation="border" variant="primary" />
      </div>
    );
};

export default Chat;
