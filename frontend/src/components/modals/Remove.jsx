import React from "react";
import { Modal, Button } from "react-bootstrap";

import { useSocket } from "../../hooks/index.js";

const Remove = ({ onHide, modalInfo }) => {
  const { id } = modalInfo.channelInfo;
  const { deleteChannel } = useSocket();

  const handleClick = () => {
    deleteChannel(id, onHide);
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" type="button" className="me-2" onClick={onHide}>Отменить</Button>
          <Button variant="danger" type="submit" onClick={handleClick}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
