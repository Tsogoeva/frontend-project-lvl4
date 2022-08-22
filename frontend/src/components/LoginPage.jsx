import React, { useRef, useEffect, useState } from "react";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

import picture from "../assets/greetingPicture.jpg";
import { useAuth } from "../hooks/index.js";
import routes from "../routes.js";

const Login = () => {
    const auth = useAuth();
    const [authFailed, setAuthFailed] = useState(false);
    const inputRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const validationSchema = yup.object({
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
           // console.log(values)

            try {
                const response = await axios.post(routes.loginPath(), values);
                auth.logIn(response.data);
                const { from } = location.state || { from: { pathname: '/' } };
                navigate(from);
              } catch (error) {
                console.log({ error })
                if (error.isAxiosError && error.response.status === 401) {
                  setAuthFailed(true);
                  inputRef.current.select();
                  return;
                }
                if (error.response.status === 500) {
                  toast.error('Ошибка сети!');
                  return;
                }
                throw error;
              }
        },
    });

    return (
        <Container fluid className="h-100 mt-5">
          <Row className="justify-content-center align-content-center h-100">
            <Col md={8} xxl={6} className="col-12">
              <Card className="shadow-sm">
                <Card.Body className="row p-5">
                  <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                    <img
                    src={picture}
                    className="rounded-circle"
                    alt="Войти"
                    />
                  </Col>
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <h1 className="text-center mb-4">Войти</h1>

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
                        placeholder="Ваш ник"
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
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
                        placeholder="Пароль"
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
                  </Form>
                </Card.Body>

                <Card.Footer className="p-4">
                    <div className="text-center">
                        <span>Нет аккаунта?</span>
                        {' '}
                        <Link to={routes.signupPagePath()}>Регистрация</Link>
                    </div>
                </Card.Footer>
  
              </Card>
            </Col>
          </Row>
        </Container>
    );
}

export default Login;