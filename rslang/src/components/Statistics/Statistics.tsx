import "bootstrap/dist/css/bootstrap.min.css";
import "./Statistics.scss";
import {useState} from "react";
import { Container } from "react-bootstrap";
import getUserData from "../../api/getUserData";
import useLocalStorage from "../../hooks/useLocalStorage";
import { url } from "../../api/defData";

interface InterfaceStatistics {}
interface dataInterface {
  id: string
  learnedWords: number
}

const Statistics: React.FC<InterfaceStatistics> = (props) => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [username, setUserName] = useLocalStorage("username", "");
  const [userpic, setUserPic] = useLocalStorage("userpic", "");
  const [statistics, setStatistics] = useLocalStorage("statistics", {});


  async function getStatistic(url: string, bearerToken: string) {
    const fullUrl = `${url}users/${userId}/statistics`;
    await getUserData(fullUrl, bearerToken).then(( responseData:any ) => {
      console.log(responseData);
  })
  .catch(error => {
      console.log(error.message)
    })
  }

  // getStatistic(url, token)

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Статистика</h2>
        <p>{"Статистика пользователя - " + username}</p>
        <p>{"Выучено слов - " +  statistics.learnedWords}</p>
      </Container>
    </Container>
  );
};
export default Statistics;
