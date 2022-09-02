import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useApi } from '../../contexts/ApiContext.jsx';
import { getChannels, getModalInfo } from '../../slices/selectors.js';
import { closeModal } from '../../slices/modalsSlice.js';

const Rename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setNewChannelName } = useApi();

  const channels = useSelector(getChannels);
  const channelNames = channels.map((channel) => channel.name);

  const { data } = useSelector(getModalInfo);
  const [openModal, setOpenModal] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    setOpenModal(true);
    inputRef.current.select();
  }, [openModal]);

  const onHide = () => {
    dispatch(closeModal());
  };

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
