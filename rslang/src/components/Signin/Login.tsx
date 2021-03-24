import "bootstrap/dist/css/bootstrap.min.css";
import "./signin.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";


const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const [message, setMessage] = useState<any>(null);
  
  function api<T>(url: string, data: any): Promise<T> {
   const init: RequestInit = {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   };
    return fetch(url, init)
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<T>
      })
  }

  const onSubmit = async (data: any): Promise<any> => {
    setMessage({
      data: `Выполняется вход...`,
      type: "none",
    });
  const url = 'https://serene-falls-78086.herokuapp.com/signin';

  api<any>(url, data)
  .then(({ responseData }) => {
    console.log(responseData)
    setMessage({
      data: "Вход выполнен",
      type: "",
    });
  })
  .catch(error => {
        setMessage({
      data: "Ошибка входа",
      type: "alert-warning",
    });
  })
  };

  return (
    <>
      <Modal.Body>
             <Form>
                {message && (
                  <div
                    className={`alert fade show d-flex ${message.type}`}
                     role="alert"
                  >{message.data}
                  { message.type === 'alert-warning' && ( <span
              aria-hidden="true"
              className="ml-auto cursor-pointer"
              onClick={() => setMessage(null)}
            >
              &times;
            </span>)}
                  </div>)}
              <Form.Group controlId="formBasicEmail 2">
                <Form.Label>
                  Email адрес
                </Form.Label>
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
      <Button variant="primary"
      type="submit"
      onClick={handleSubmit(onSubmit)}
      >
        Войти
      </Button>
    </Modal.Footer>
  </>      
  );
};

export default Login;
