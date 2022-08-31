import React, { useRef, useEffect, useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import picture from '../assets/greetingPicture.jpg';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const Login = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    if (auth.loggedIn) {
      navigate(routes.chatPagePath());
      return;
    }
    navigate(routes.loginPagePath());
  }, [auth.loggedIn, navigate]);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        if (error.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        if (error.isAxiosError && error.message === 'Network Error') {
          toast.error(t('notices.networkError'));
          return;
        }
        if (error.response.status === 500) {
          toast.error(t('notices.serverError'));
          rollbar.error(t('notices.serverError'), error, { values });
          return;
        }
        toast.error(t('notices.unknownError'));
        rollbar.error(t('notices.unknownError'), error, { values });
        throw new Error(error);
      }
    },
  });

  return (
    <Container fluid className="h-100 mt-5">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col
                xs={12}
                md={6}
                className="d-flex align-items-center justify-content-center"
              >
                <img
                  src={picture}
                  className="rounded-circle"
                  alt={t('login.header')}
                />
              </Col>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('login.header')}</h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                    placeholder={t('login.username')}
                  />
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                    placeholder={t('login.password')}
                  />
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control.Feedback
                    type="invalid"
                    tooltip
                  >
                    {t('feedback.incorrectLoginOrPassword')}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="outline-primary"
                  disabled={formik.isSubmitting}
                  className="w-100 mb-3"
                >
                  {t('login.submit')}
                </Button>
              </Form>
            </Card.Body>

            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.footerText')}</span>
                <Link to={routes.signupPagePath()}>{t('login.footerLink')}</Link>
              </div>
            </Card.Footer>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
