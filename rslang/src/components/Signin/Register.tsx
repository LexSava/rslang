import "bootstrap/dist/css/bootstrap.min.css";
import "./signin.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import { url } from "../../api/defData";

const custom = 'custom';
const defAvatar = 'avatars/defavatar.png'

const Register = () => {
  const { register, handleSubmit, errors } = useForm();

  const [message, setMessage] = useState<any>(null);
  
  async function api<T>(url: string, userData: any): Promise<T> {
    console.log(userData.file.length)
    if(userData.file.length === 0) {userData.userpic = defAvatar}
      else {userData.userpic = custom}
    const init: RequestInit = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
   };
    const response = await fetch(url, init);
    
    if (!response.ok) {
      const error = response.status + " " + response.statusText;
        throw new Error(error)
      }
    const body = await response.json();
    return body
  }

  async function avatar<T>(file: any, userId: string): Promise<T> {
    const fullUrl = `${url}avatar`;
    console.log(file)
    const formData:any = new FormData();
    const newFileName = userId + '.jpg';
    formData.append("file", file[0], newFileName);
    console.log(formData)
    const init: RequestInit = {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    },
    body: formData
   };
    const response = await fetch(fullUrl, init);
    console.log(response)
    if (!response.ok) {
      const error = response.status + " " + response.statusText;
        throw new Error(error)
      }
    
    const body = await response.json();

    return body
  }

  const onSubmit = async (userData: any): Promise<any> => {
    setMessage({
      data: `Выполняется регистрация...`,
      type: "none",
    });

  const fullUrl = `${url}users`;

  api<any>(fullUrl, userData).then(( responseData:any ) => {
    setMessage({
      data: "Регистрация выполнена",
      type: "",
    });
    setTimeout(setMessage, 5000)
    console.log(responseData)
    if (userData.userpic === custom) {
    avatar<any>(userData.file, responseData.id).then(( res:any ) => {
      console.log(res)
      }).catch(error => {
      console.log(error)
      })
    }
  })
  .catch(error => {
    console.log(error.message)
    if (error.message === "417 Expectation Failed")  {
    setMessage({
      data: "Такой email уже зарегистрирован",
      type: "alert-warning",
    });
    } else {
    setMessage({
      data: "Ошибка регистрации",
      type: "alert-warning",
    });
    }
    setTimeout(setMessage, 5000)
  })
  };
  
  return (
      <>
      <Modal.Body>
        <Form>
          <div className="message">
           {message && (
              <div className={`alert fade show d-flex ${message.type}`}
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
           </div>
          <Form.Group controlId="formBasicEmail 1">
          <Form.Label>Email адрес</Form.Label>
          <Form.Control type="email"
            placeholder="Введите email"
            autoComplete="username"
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
          <Form.Group controlId="formBasicName 1">
          <Form.Label>Имя</Form.Label>
          <Form.Control type="name"
            placeholder="Введите имя"
            name="username"
            ref={register({
              required: {
              value: false,
              message: "Необходимо ввести email",
              },
              maxLength: {
                value: 70,
                message: "Не более 70 символов",
              },
            })}
           />
            <Form.Text className="errorMessage mandatory">
              {errors.name && (
                <span className="errorMessage mandatory">
                  {errors.name.message}
                </span>
              )}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword 1">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password"
              placeholder="Пароль"
              autoComplete="current-password"
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
        <Button variant="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)} 
          active>
          Зарегистрироваться
        </Button>
      </Modal.Footer>
    </>
  );
};
export default Register;
