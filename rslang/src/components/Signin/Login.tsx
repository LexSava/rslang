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
  const [isLoged, setLoged] = useState(false);
  
  let token = "";
  let userId = "";

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
    localStorage.setItem("statistics", JSON.stringify(responseData))
  })
  .catch(error => {
      setMessage({
        data: "Создание новых данных",
        type: "",
      });
    const dateNow = new Date().toLocaleString("ru-Ru", { year: "numeric", month: "numeric", day: "numeric" });
    defStatisticsData.optional = {"regDate": dateNow};
    setUserData(fullUrl, token, defStatisticsData).then(( responseData:any ) => {
    localStorage.setItem("statistics", JSON.stringify(responseData))
  })
  .catch(error => {
      console.log(error.message)
      });
    });
  }

  const getSettings = () => {
    if(userId && token) {
    console.log(userId, token)
    const fullUrl = `${url}users/${userId}/settings`;
    getUserData(fullUrl, token).then(( responseData:any ) => {
    localStorage.setItem("settings", JSON.stringify(responseData))
    }).catch(error => {
      setMessage({
        data: "Создание новых данных",
        type: "",
      });
      setUserData(fullUrl, token, defSettingsData).then(( responseData:any ) => {
      localStorage.setItem("settings", JSON.stringify(responseData))
    }).catch(error => {
      console.log(error.message)
      });
    });
    }
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
    console.log(responseData)
    token = responseData.token;
    userId = responseData.userId;
    setTimeout(setMessage, 4000);
    localStorage.setItem("refreshToken", JSON.stringify(responseData.refreshToken));
    localStorage.setItem("username", JSON.stringify(responseData.username));
    localStorage.setItem("userpic", JSON.stringify(responseData.userpic));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userId", JSON.stringify(userId));
      setMessage({
      data: "Получение данных пользователя",
      type: "",
    });
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
      data: "Ошибка входа",
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
      active>
        Войти
      </Button>
    </Modal.Footer>
  </>      
  );
};

export default Login;
