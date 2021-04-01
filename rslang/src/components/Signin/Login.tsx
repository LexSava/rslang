import "bootstrap/dist/css/bootstrap.min.css";
import "./signin.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import useLocalStorage from "../../hooks/useLocalStorage";
import getUserData from "../../api/getUserData";
import setUserData from "../../api/setUserData";
import { Redirect } from 'react-router';
import { url, defSettingsData, defStatisticsData } from "../../api/defData";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState<any>(null);
  const [token, setToken] = useLocalStorage("token", "");
  const [refToken, setRefToken] = useLocalStorage("refreshToken", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [userpic, setUserPic] = useLocalStorage("userpic", "");
  const [username, setUserName] = useLocalStorage("username", "");
  const [statistics, setStatistics] = useLocalStorage("statistics", "");
  const [settings, setSettings] = useLocalStorage("settings", "");
  const [isLoged, setLoged] = useState(false);

  async function api<T>(url: string, data: any): Promise<T> {
   const init: RequestInit = {
     method: 'POST',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
   };
    const response = await fetch(url, init);
    
    if (!response.ok) {
      const error = response.status + " " + response.statusText;
        throw new Error(error)      }
    const body = await response.json();
    return body
  }

  const getStatistics = () => {
        const fullUrl = `${url}users/${userId}/statistics`;

    getUserData(fullUrl, token).then(( responseData:any ) => {
    console.log(responseData)
    setStatistics(responseData)
  })
  .catch(error => {
      console.log(error.message);
      setUserData(fullUrl, token, defStatisticsData).then(( responseData:any ) => {
    console.log(responseData)
    setStatistics(responseData)
  })
  .catch(error => {
      console.log(error.message)
      });
    });
    }

  const getSettings = () => {
    const fullUrl = `${url}users/${userId}/settings`;

    getUserData(fullUrl, token).then(( responseData:any ) => {
    console.log(responseData)
    setSettings(responseData)
  })
  .catch(error => {
    console.log(error.message);
    setUserData(fullUrl, token, defSettingsData).then(( responseData:any ) => {
    console.log(responseData)
    setStatistics(responseData)
  })
  .catch(error => {
      console.log(error.message)
      });
    });
    }
  

  const onSubmit = async (data: any): Promise<any> => {
    setMessage({
      data: `Выполняется вход...`,
      type: "none",
    });

  const fullUrl = url + "signin";

  api(fullUrl, data).then(( responseData:any ) => {
    setMessage({
      data: "Вход выполнен",
      type: "",
    });
    setTimeout(setMessage, 5000)
    console.log(responseData)
    setToken(responseData.token)
    setRefToken(responseData.refreshToken)
    setUserId(responseData.userId)
    setUserName(responseData.username)
    setUserPic(responseData.userpic)
    getSettings();
    getStatistics();
    setTimeout(() => setLoged(true), 5000)
  })
  .catch(error => {
      console.log(error.message);
    if (error.message === "403 Forbidden")  {
    setMessage({
      data: "Неверный пароль",
      type: "alert-warning",
    })
    } else if (error.message === "404 Not Found") {
    setMessage({
      data: "Пользователь с таким email не найден",
      type: "alert-warning",
    })
    } else if (error.message) {
    setMessage({
      data: "Ошибка регистрации",
      type: "alert-warning",
    });
    }
    setTimeout(setMessage, 5000);
  })
  };


  return (
    <>
      <Modal.Body>
        {isLoged && <Redirect to="/tutorial-page"/>}
             <Form>
              <div className="message">
                {message && (
                  <div
                    className={`alert fade show d-flex ${message.type}`}
                     role="alert"
                    >{message.data}
                    { message.type === 'alert-warning' && ( 
                    <span aria-hidden="true"
                     className="ml-auto cursor-pointer"
                     onClick={() => setMessage(null)}
                      >
                      &times;
                    </span>)}
                  </div>)}
              </div>    
              <Form.Group controlId="formBasicEmail 2">
                <Form.Label>
                  Email адрес
                </Form.Label>
                <Form.Control type="email" placeholder="Введите email"
                name="email"
                autoComplete="username"
                ref={register({
                  required: {
                    value: true,
                    message: "Нужно ввести email",
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
                autoComplete="current-password"
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
