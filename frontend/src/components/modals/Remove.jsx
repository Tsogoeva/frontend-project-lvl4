import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useApi } from '../../hooks/index.js';
import { getModalInfo } from '../../slices/selectors.js';

const Remove = ({ onHide }) => {
  const { t } = useTranslation();
  const { data: { id } } = useSelector(getModalInfo);
  const { deleteChannel } = useApi();

  const handleClick = () => {
    deleteChannel(id, onHide);
    toast.success(t('notices.removeChannel'));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('modals.remove.warning')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            type="button"
            className="me-2"
            onClick={onHide}
          >
            {t('modals.remove.cancel')}
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={handleClick}
          >
            {t('modals.remove.submit')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default Remove;
