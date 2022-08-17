import React, { useState, useRef, useEffect } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { ArrowRightCircleFill } from "react-bootstrap-icons";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

const ChatMessageField = () => {
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    });

    const handleChange = (e) => {
        setText(e.target.value)
    };

    return (
        <div className="mt-auto px-5 py-3">
              <Form className="border rounded" onSubmit={handleSubmit}>
                <InputGroup>
                    <FormControl
                    className="border-0 p-0 ps-2"
                    name="body"
                    value={text}
                    onChange={(e) => handleChange(e)}
                    placeholder="Введите сообщение..."
                    aria-label="Новое сообщение"
                    ref={inputRef}
                    />
                    <Button
                    type="submit"
                    variant="link"
                    className="mb-1 text-dark"
                    disabled={!dirty || isSubmitting}
                    >
                    <ArrowRightCircleFill size={20} />
                    <span className="visually-hidden">Отправить</span>
                    </Button>
                </InputGroup>
              </Form>
        </div>
    )
}

export default ChatMessageField;
