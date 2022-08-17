import React from "react";
import {
  Button,
  Nav,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { setCurrentChannelId } from "../slices/channelsSlice.js";


const ChatChannelsList = () => {
    const channels = useSelector((state) => Object.values(state.channels.entities));
    const currentChannelId = useSelector((state) => state.channels.currentChannelId);
    const dispatch = useDispatch();
  
    const handleClick = (channelId) => () => {
      dispatch(setCurrentChannelId(channelId));
    };
  
    return (
      <Nav fill variant="pills" as="ul" className="flex-column px-2">
        {channels.map(({ id, name, removable }) => {
          const variant = id === currentChannelId ? 'secondary' : '';
  
          return removable ? (
            <Nav.Item key={id} className="w-100">
              <Dropdown as={ButtonGroup} className="d-flex">
  
                <Button variant={variant} className="w-100 rounded-0 text-start" onClick={handleClick(id)}>
                  <span className="me-1">#</span>
                  {name}
                </Button>
  
                <Dropdown.Toggle split variant={variant} className="flex-grow-0">
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
  
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => showModal('removing', id, name)}>Удалить</Dropdown.Item>
                  <Dropdown.Item onClick={() => showModal('renaming', id, name)}>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
  
              </Dropdown>
            </Nav.Item>
          ) : (
            <Nav.Item key={id}>
              <Button variant={variant} className="w-100 rounded-0 text-start" onClick={handleClick(id)}>
                <span className="me-1">#</span>
                {name}
              </Button>
            </Nav.Item>
          )
        })}
      </Nav>
    )
  };

export default ChatChannelsList;