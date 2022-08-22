import React, { useRef, useEffect, useState } from "react";
import {
    Form,
    Button,
    Container,
    Row,
    Col,
    Card,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

import picture from "../assets/registrationPicture.jpg";
import { useAuth } from "../hooks/index.js";
import routes from "../routes.js";


const SignUp = () => {
    const auth = useAuth();
    const [feedback, setFeedback] = useState({ required: 'Обязательное поле', exist: '' });
    const inputRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const validationSchema = yup.object().shape({
        username: yup.string().required().min(3).max(20),
        password: yup.string().required().min(6),
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
                auth.logIn(response.data);
                const { from } = location.state || { from: { pathname: '/' } };
                navigate(from);
            } catch (error) {
                if (error.isAxiosError && error.response.status === 409) {
                    setFeedback({ required: '', exist: 'Такой пользователь уже существует' });
                    inputRef.current.select();
                } if (error.response.status === 500) {
                    toast.error('Ошибка сети!');
                    return;
                }
                throw error;
            }
        },
        validateOnChange: false,
    });

    return (
        <Container fluid className="h-100">
          <Row className="justify-content-center align-content-center h-100">
            <Col md={8} xxl={6} className="col-12">
              <Card className="shadow-sm">
                <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <Col xs={12} md={6}>
                    <img src={picture} className="rounded-circle" alt="Регистрация" />
                  </Col>
                  <Form onSubmit={formik.handleSubmit} className="w-50">
                    <h1 className="text-center mb-4">Регистрация</h1>

                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        name="username"
                        id="username"
                        autoComplete="username"
                        isInvalid={(formik.errors.username && formik.touched.username) || feedback.exist}
                        required
                        ref={inputRef}
                        placeholder="От 3 до 20 символов"
                      />
                      <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                      <Form.Control.Feedback placement="right" type="invalid" tooltip>{feedback.required}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        isInvalid={(formik.errors.password && formik.touched.password) || feedback.exist}
                        required
                        placeholder="Не менее 6 символов"
                        aria-describedby="passwordHelpBlock"
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{feedback.required}</Form.Control.Feedback>
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        isInvalid={feedback.exist}
                        required
                        placeholder="Пароли должны совпадать"
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{feedback.exist}</Form.Control.Feedback>
                      <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="w-100">Зарегистрироваться</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    )
};

export default SignUp;
