import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";

import { useSocket } from "../../hooks/index.js";

const Add = ({ onHide }) => {
  const channels = useSelector((state) => Object.values(state.channels.entities));
  const channelNames = channels.map((channel) => channel.name);
  
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { addNewChannel } = useSocket();

  yup.setLocale({
    mixed: {
      required: 'Обязательное поле',
      notOneOf: 'Должно быть уникальным',
      min: 'от 3 до 20 символов',
      max: 'от 3 до 20 символов',
    },
  });

  const schema = yup.object({
    name: yup.string().required().min(3).max(20).notOneOf(channelNames),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    onSubmit: ({ name }) => {
        addNewChannel(name, () => {
          formik.resetForm();
          onHide();
        });
      },
    validateOnChange: false,
    validateOnBlur: false,
    });

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group as={InputGroup} className="mb-3 modal-input-block">
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              type="text"
              id="name"
            />
            <Form.Label
              htmlFor="name"
              className="visually-hidden"
            >
              Имя канала
            </Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" className="me-2" onClick={onHide}>Отменить</Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
