import React from "react";
import {
    Container,
    Button,
    Navbar as BootstrapNavbar,
} from "react-bootstrap";
// import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/index.js";

const Header = () => {
  const { logOut, loggedIn } = useAuth();
 // const { t } = useTranslation();
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">Hexlet Chat</BootstrapNavbar.Brand>
        {loggedIn && <Button onClick={logOut}>logout</Button>}
      </Container>
    </BootstrapNavbar>
  );
};

export default Header;
