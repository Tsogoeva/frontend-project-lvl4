import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../../hooks/index.js';

const Rename = ({ onHide, modalInfo }) => {
  const { data } = modalInfo;
  const { setNewChannelName } = useApi();
  const { t } = useTranslation();

  const channels = useSelector((state) => Object.values(state.channels.entities));
  const channelNames = channels.map((channel) => channel.name);

  const [openModal, setOpenModal] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    setOpenModal(true);
    inputRef.current.select();
  }, [openModal]);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('feedback.required')
      .min(3, 'feedback.usernameLength')
      .max(20, 'feedback.usernameLength')
      .notOneOf(channelNames, 'feedback.uniqueName'),
  });

  const formik = useFormik({
    initialValues: { name: data.name },
    validationSchema,
    onSubmit: ({ name }) => {
      setNewChannelName({ name, id: data.id }, () => {
        formik.resetForm();
        setOpenModal(false);
        onHide();
        toast.success(t('notices.renameChannel'));
      });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={!!formik.errors.name}
              id="name"
              name="name"
            />
            <Form.Label
              htmlFor="name"
              className="visually-hidden"
            >
              {t('modals.rename.channelName')}
            </Form.Label>
            <Form.Control.Feedback
              type="invalid"
            >
              {t(formik.errors.name)}
            </Form.Control.Feedback>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                type="button"
                className="me-2"
                onClick={onHide}
              >
                {t('modals.rename.cancel')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modals.rename.submit')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Rename;
