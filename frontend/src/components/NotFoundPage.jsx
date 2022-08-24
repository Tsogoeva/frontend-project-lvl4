import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import routes from "../routes.js";

import picture from "../assets/notFoundPicture.svg";

const NotFoundPage = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'notFound' });

    return (
        <div className="text-center">
            <img alt={t('pageNotFoundAlt')} className="img-fluid h-25" src={picture} />
            <h1 className="h4 text-muted">
              {t('pageNotFound')}
            </h1>
            <p className="text-muted">
              {t('textToLink')}
              <Link to={routes.chatPagePath()}>{t('link')}</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
