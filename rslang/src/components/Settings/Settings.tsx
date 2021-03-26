import "bootstrap/dist/css/bootstrap.min.css";
import "./Settings.scss";
import { useState } from "react";
import { Container } from "react-bootstrap";
import getUserData from "../../api/getUserData";
import useLocalStorage from "../../hooks/useLocalStorage"

interface InterfaceSettings {}
interface dataInterface {
    id: string,
    wordsPerDay: number
}

const Settings: React.FC<InterfaceSettings> = (props) => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [wordsPerDay, setWordsPerDay] = useState(0);
  const url = `https://serene-falls-78086.herokuapp.com/users/`;
  
  async function getSettings(url: string, bearerToken: string) {
    const fullUrl = `${url + userId}/settings`;
    await getUserData(fullUrl, bearerToken).then(( responseData:any ) => {
    console.log(responseData)
    setWordsPerDay(responseData.wordsPerDay)
  })
  .catch(error => {
      console.log(error.message)
    })
  }

  getSettings(url, token)

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Настройки</h2>
        <p>{"Пользователь - " +  userId}</p>
        <p>{"Количество слов в день - " + wordsPerDay}</p>
      </Container>
    </Container>
  );
};

export default Settings;
