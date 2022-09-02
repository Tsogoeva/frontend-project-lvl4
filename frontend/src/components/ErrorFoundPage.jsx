import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import routes from '../routes.js';
import { getDataInfo } from '../slices/selectors.js';
import picture from '../assets/errorPicture.png';

const ErrorFoundPage = () => {
  const { t } = useTranslation();

  const { dataError } = useSelector(getDataInfo);

  return (
    <div className="text-center">
      <img
        alt={t('errorFound.errorFoundAlt')}
        className="img-fluid h-25"
        src={picture}
      />
      <h1 className="h4 text-muted">
        {t('errorFound.errorFound')}
        {dataError}
      </h1>
      <p className="text-muted">
        {t('errorFound.textToLink')}
        <Link to={routes.chatPagePath()}>{t('errorFound.link')}</Link>
      </p>
    </div>
  );
};

export default ErrorFoundPage;
