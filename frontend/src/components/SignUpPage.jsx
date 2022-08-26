import React, { useRef, useEffect, useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import picture from '../assets/registrationPicture.jpg';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const SignUp = () => {
  const auth = useAuth();
  const [validValues, setValidValues] = useState(true);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rollbar = useRollbar();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  yup.setLocale({
    mixed: {
      required: t('feedback.required'),
      oneOf: t('feedback.passwordMatch'),
    },
  });

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(3, t('feedback.usernameLength', { min: 3, max: 20 }))
      .max(20, t('feedback.usernameLength', { min: 3, max: 20 })),
    password: yup
      .string()
      .required()
      .min(6, t('feedback.passwordLength', { min: 6 })),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')]),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post(routes.signupPath(), { username, password });
        setValidValues(true);
        auth.logIn(response.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (error) {
        if (error.response.status === 409) {
          toast.error(t('notices.userExists'));
          rollbar.error(t('notices.userExists'), error, { username, password });
          setValidValues(false);
          inputRef.current.select();
          return;
        }
        if (error.response.status === 500) {
          toast.error(t('notices.serverError'));
          rollbar.error(t('notices.serverError'), error, { username, password });
          return;
        }
        if (error.isAxiosError && error.message === 'Network Error') {
          toast.error(t('notices.networkError'));
          return;
        }
        toast.error(t('notices.unknownError'));
        rollbar.error(t('notices.unknownError'), error, { username, password });
        throw new Error(error);
      }
    },
    validateOnChange: false,
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = formik;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col md={8} xxl={6} className="col-12">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Col xs={12} md={6}>
                <img src={picture} className="rounded-circle" alt="Регистрация" />
              </Col>
              <Form onSubmit={handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signUp.header')}</h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={(errors.username && touched.username) || !validValues}
                    ref={inputRef}
                    placeholder={t('feedback.usernameLength', { min: 3, max: 20 })}
                  />
                  <Form.Label htmlFor="username">{t('signUp.username')}</Form.Label>
                  <Form.Control.Feedback placement="right" type="invalid" tooltip>{errors.username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    isInvalid={(errors.password && touched.password) || !validValues}
                    placeholder={t('feedback.passwordLength', { min: 6 })}
                    aria-describedby="passwordHelpBlock"
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                  <Form.Label htmlFor="password">{t('signUp.password')}</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    isInvalid={(errors.confirmPassword && touched.confirmPassword) || !validValues}
                    placeholder={t('feedback.passwordMatch')}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword}</Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">{t('signUp.confirmPassword')}</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" disabled={formik.isSubmitting} className="w-100">{t('signUp.submit')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
