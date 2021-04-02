import "bootstrap/dist/css/bootstrap.min.css";
import "./Settings.scss";
import { useState } from "react";
import { Container } from "react-bootstrap";
import getUserData from "../../api/getUserData";
import useLocalStorage from "../../hooks/useLocalStorage";
import { url } from "../../api/defData";

interface InterfaceSettings {}
interface dataInterface {
    id: string,
    wordsPerDay: number
}

const Settings: React.FC<InterfaceSettings> = (props) => {
  // const [userId, setUserId] = useLocalStorage("userId", "");
  // const [token, setToken] = useLocalStorage("token", "");
  const [username, setUserName] = useLocalStorage("username", "");
  // const [userpic, setUserPic] = useLocalStorage("userpic", "");
  const [settings, setSettings] = useLocalStorage("settings", {});

  // async function getSettings(url: string, bearerToken: string) {
  //   const fullUrl = `${url}users/${userId}/settings`;
  //   await getUserData(fullUrl, bearerToken).then(( responseData:any ) => {
  //   console.log(responseData)
  // })
  // .catch(error => {
  //     console.log(error.message)
  //   })
  // }

  // getSettings(url, token)

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Настройки</h2>
        <p>{"Пользователь - " +  username}</p>
        <p>{"Количество слов в день - " + settings.wordsPerDay}</p>
      </Container>
    </Container>
  );
};

export default Settings;
