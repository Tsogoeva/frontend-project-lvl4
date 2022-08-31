import React from 'react';
import {
  Col,
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import { setCurrentChannelId } from '../slices/channelsSlice.js';
import { openModal } from '../slices/modalsSlice.js';

const ChatChannelsList = ({ channels, currentChannelId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'chat.channelList' });

  const dispatch = useDispatch();

  const showModal = (type, data) => () => {
    dispatch(openModal({ type, data }));
  };

  const handleClick = (channelId) => () => {
    dispatch(setCurrentChannelId(channelId));
  };

  return (
    <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">

      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('header')}</span>
        <Button
          type="button"
          onClick={showModal('adding')}
          variant="group-vertical"
          className="p-0 text-primary"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <Nav fill variant="pills" as="ul" className="flex-column px-2">
        {channels.map(({ id, name, removable }) => {
          const variant = id === currentChannelId ? 'secondary' : '';
          const censoredName = filter.clean(name);

          return removable ? (
            <Nav.Item key={id} className="w-100">
              <Dropdown as={ButtonGroup} className="d-flex">

                <Button
                  variant={variant}
                  className="w-100 rounded-0 text-start text-truncate"
                  onClick={handleClick(id)}
                >
                  <span className="me-1">#</span>
                  {censoredName}
                </Button>

                <Dropdown.Toggle split variant={variant} className="flex-grow-0">
                  <span className="visually-hidden">{t('channelControl')}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={showModal('removing', { id })}
                  >
                    {t('removeChannel')}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={showModal('renaming', { id, name })}
                  >
                    {t('renameChannel')}
                  </Dropdown.Item>
                </Dropdown.Menu>

              </Dropdown>
            </Nav.Item>
          ) : (
            <Nav.Item key={id}>
              <Button
                variant={variant}
                className="w-100 rounded-0 text-start"
                onClick={handleClick(id)}
              >
                <span className="me-1">#</span>
                {name}
              </Button>
            </Nav.Item>
          );
        })}
      </Nav>
    </Col>
  );
};

export default ChatChannelsList;
