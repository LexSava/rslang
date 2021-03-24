import "bootstrap/dist/css/bootstrap.min.css";
import "./signin.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal, Tabs, Tab } from "react-bootstrap";

interface SigninProps {
  tab: string
}

const Signin = (Props:SigninProps) => {
  const [key, setKey] = useState(Props.tab);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit, errors } = useForm();

  const [message, setMessage] = useState({
      data: "Registration is in progress...",
      type: "alert-warning",
    });
  
  const onSbmit = (data: any) => {console.log(data)} 
  const onSubmit:any = (data: any, e: { target: { reset: () => Event; }; }) => {
    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning",
    });
    const init: RequestInit = {method: "POST",
      mode: 'no-cors',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)}
    console.log(data)
    fetch(`http://serene-falls-78086.herokuapp.com/users`, init)
      .then((res) => res.json())
      .then((data) => {
        const hasError = "error" in data && data.error != null;
        setMessage({
          data: hasError ? data.error : "Registered successfully",
          type: hasError ? "alert-danger" : "alert-success",
        });

        !hasError && e.target.reset();
      });
  };

  return (
      <>
      <Button 
        className={Props.tab === 'login' ? "btn btn-primary rounded-pill border border-4 btn-lg mr-3 login-button" : "rounded-pill description-btn mt-3"}
        variant={Props.tab === 'login' ? "primary" : "outline-primary"} 
        onClick={handleShow}>
        {Props.tab === 'login' ? 'Войти' : 'Регистрация'}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Войдите или Зарегистрируйтесь</Modal.Title>
        </Modal.Header>
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k: any) => setKey(k)}>
        <Tab eventKey="register" title="Зарегистрироваться">
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail 1">
              <Form.Label>Email адрес</Form.Label>
              <Form.Control type="email"
              placeholder="Введите email"
              name="email"
              ref={register({
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Введите email формата email@email.com",
                  },
                  minLength: {
                    value: 5,
                    message: "Не менее 5 символов",
                  },
                  maxLength: {
                    value: 70,
                    message: "Не более 70 символов",
                  },
                })}
              />
              <Form.Text className="errorMessage mandatory">
              {errors.email && (
                <span className="errorMessage mandatory">
                  {errors.email.message}
                </span>
              )}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword 1">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password"
               placeholder="Пароль"
               name="password"
               ref={register({
                  required: {
                    value: true,
                    message: "Введите пароль",
                  },
                  minLength: {
                    value: 8,
                    message: "Не менее 8 символов",
                  },
                  maxLength: {
                    value: 100,
                    message: "Не более 100 символов",
                  },
                })}
              />
              <Form.Text className="text-muted">
                {errors.password && (
                <span className="errorMessage mandatory">
                  {errors.password.message}
                </span>
              )}
              </Form.Text>
           </Form.Group>
            <Form.Group>
              <Form.File id="FormControlFile1"
               label="Выберите изображение профиля" 
               name="file"
               ref={register({
                  required: {
                    value: false,
                    message: "Выбирите файл",
                  }
                })}
               />
              <Form.Text className="errorMessage mandatory">
              Если файл не выбран или имеет тип отличный от *.jpg,  *.png
              </Form.Text>
              <Form.Text className="errorMessage mandatory">
              будет установлено изображение по-умолчанию
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            <Button variant="primary"
                type="submit"
                onClick={handleSubmit(onSbmit)}>
                Зарегистрироваться
            </Button>
        </Modal.Footer>
        </Tab>
        <Tab eventKey="login" title="Войти">
        <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail 2">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control type="email" placeholder="Введите email"
                name="email"
                ref={register({
                  required: {
                    value: true,
                    message: "Please enter your email address",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Введите email формата email@email.com",
                  },
                  minLength: {
                    value: 5,
                    message: "Не менее 5 символов",
                  },
                  maxLength: {
                    value: 70,
                    message: "Не более 70 символов",
                  },
                })}
                />
                <Form.Text className="text-muted">
                {errors.email && (
                <span className="errorMessage mandatory">
                  {errors.email.message}
                </span>
              )}
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword 2">
                <Form.Label>Пароль</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Пароль"
                   name="password"
                ref={register({
                  required: {
                    value: true,
                    message: "Введите пароль",
                  },
                  minLength: {
                    value: 8,
                    message: "Не менее 8 символов",
                  },
                  maxLength: {
                    value: 100,
                    message: "Не более 100 символов",
                  },
                })}
                 />
                <Form.Text className="text-muted">
                {errors.password && (
                <span className="errorMessage mandatory">
                  {errors.password.message}
                </span>
                  )}
                </Form.Text>
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Отмена</Button>
            <Button variant="primary"
                type="submit"
                onClick={handleSubmit(onSbmit)}
                >
                Войти
            </Button>
        </Modal.Footer>
          </Tab>
          </Tabs>
    </Modal>
    </>
  );
};
export default Signin;
