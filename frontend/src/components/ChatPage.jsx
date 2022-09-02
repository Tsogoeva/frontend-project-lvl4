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

import { useAuth } from '../contexts/AuthContext.jsx';
import { fetchData } from '../slices/channelsSlice.js';
import { closeModal } from '../slices/modalsSlice.js';
import { getDataInfo, getModalInfo } from '../slices/selectors.js';
import getModal from './modals/index.js';

import ChatChannelsList from './ChatChannelsList.jsx';
import ChatHeader from './ChatHeader.jsx';
import ChatMessagesBox from './ChatMessagesBox.jsx';
import ChatMessageField from './ChatMessageField.jsx';

const Modals = () => {
  const { type } = useSelector(getModalInfo);

  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component />;
};

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const rollbar = useRollbar();

  useEffect(() => {
    dispatch(fetchData(getAuthHeader));
  }, [dispatch, getAuthHeader]);

  const { dataError, dataStatus } = useSelector(getDataInfo);
  const { isOpen } = useSelector(getModalInfo);

  if (dataError) {
    toast.warn(t('notices.loadedDataError'));
    rollbar.error(t('notices.loadedDataError'), dataError);
  }

  const ChatComponents = () => (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">

        <ChatChannelsList />

        <Col className="p-0 h-100">

          <div className="d-flex flex-column h-100">
            <ChatHeader />
            <ChatMessagesBox />
            <ChatMessageField />
          </div>

        </Col>
      </Row>
      <Modal show={isOpen} centered onHide={() => dispatch(closeModal())}>
        <Modals />
      </Modal>
    </Container>
  );

  return dataStatus === 'idle'
    ? <ChatComponents />
    : (
      <div className="d-flex align-items-center justify-content-center h-100 centered">
        <Spinner animation="border" variant="primary" />
      </div>
    );
};

export default Chat;
