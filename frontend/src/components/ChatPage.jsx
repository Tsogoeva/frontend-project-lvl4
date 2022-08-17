import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
} from 'react-bootstrap';
import { PlusSquare } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import routes from "../routes.js";
import useAuth from "../hooks/index.js";
// import { useTranslation } from 'react-i18next';
import { addChannels, selectors, setCurrentChannelId } from "../slices/channelsSlice.js";
import { addMessages } from "../slices/messagesSlice.js";

import ChatChannelsList from "./ChatChannelsList.jsx";
import ChatHeader from "./ChatHeader.jsx";
import ChatMessagesBox from "./ChatMessagesBox.jsx";
import ChatMessageField from "./ChatMessageField.jsx";

const renderModal = ({ modalInfo, hideModal, setItems }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} setItems={setItems} onHide={hideModal} />;
};

const Chat = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const [loadedData, setLoadedData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        console.log(data)
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
        console.log(error);
      }
    };

    fetchData();
  });

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  const ChatComponents = () => (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
            
                <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                  <span>Каналы</span>
                  <Button type="button" variant="group-vertical" className="p-0 text-primary">
                    <PlusSquare size={20} /> 
                    <span className="visually-hidden">+</span>    
                  </Button>
                </div>

                <ChatChannelsList />
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <ChatHeader />
            <ChatMessagesBox />
           {/*  <ChatMessageField /> */}
          </div>
        </Col>

      

{/*                     <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
                    <div className="mt-auto px-5 py-3">
                      <form noValidate="" className="py-1 border rounded-2">
                        <div className="input-group has-validation">
                          <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
                            <button type="submit" disabled="" className="btn btn-group-vertical">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                              </svg>
                              <span className="visually-hidden">Отправить</span>
                            </button>
                        </div>
                      </form>
                    </div> */}

                {/*   </div>
                </Col> */}

 {/*                <Col lg={10} className="d-flex flex-column h-100 bg-white rounded-end">
                  
                  <Row className="rounded-top">
                    <Col className="shadow-sm py-3 bg-light rounded-top">
                      <ChatHeader />
                    </Col>
                  </Row>

                  <Row className="overflow-auto my-3 flex-grow-1">
                    <Col id="messages-box" className="chat-messages px-4" ref={messagesBoxEl}>
                      <ChatBody />
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col>
                      <ChatMessageForm />
                    </Col>
                  </Row>

                </Col>
 */}
      {/*   </Col> */}
       </Row>
    </Container>

  );

  return loadedData ? <ChatComponents /> : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <Spinner animation="border" variant="primary" />
              </div>
            );
};

export default Chat;


/* const Chat = () => {
    return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
                <span className="me-1">#</span>
                general
              </button>
            </li>
            <li className="nav-item w-100">
              <button type="button" className="w-100 rounded-0 text-start btn">
                <span className="me-1">#</span>
                random
              </button>
            </li>
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># general</b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 "></div>
            <div className="mt-auto px-5 py-3">
              <form noValidate="" className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
                    <button type="submit" disabled="" className="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
};  

export default Chat; */