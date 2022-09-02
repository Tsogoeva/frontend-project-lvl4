import React from 'react';
import {
  Container,
  Button,
  Navbar as BootstrapNavbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext.jsx';

const Header = () => {
  const { logOut, loggedIn } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">{t('appName')}</BootstrapNavbar.Brand>
        {loggedIn && <Button onClick={logOut}>{t('logOut')}</Button>}
      </Container>
    </BootstrapNavbar>
  );
};

export default Header;
