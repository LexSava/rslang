import "bootstrap/dist/css/bootstrap.min.css";
import "./Statistics.scss";
import {useState} from "react";
import { Container } from "react-bootstrap";
import getUserData from "../../api/getUserData";
import useLocalStorage from "../../hooks/useLocalStorage";

interface InterfaceStatistics {}
interface dataInterface {
  id: string
  learnedWords: number
}

const Statistics: React.FC<InterfaceStatistics> = (props) => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [learnedWords, setLearnedWords] = useState<number>(0);
  const url = `https://serene-falls-78086.herokuapp.com/users/`;

  async function getStatistic(url: string, bearerToken: string) {
    const fullUrl = `${url + userId}/statistics`;
    await getUserData(fullUrl, bearerToken).then(( responseData:any ) => {
      console.log(responseData);
      setLearnedWords(responseData.learnedWords)
  })
  .catch(error => {
      console.log(error.message)
    })
  }

  getStatistic(url, token)

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="study-page-head-block bg-light">
        <h2 className="study-page-head-text p-3">Статистика</h2>
        <p>{"Статистика пользователя - " + userId}</p>
        <p>{"Выучено слов - " +  learnedWords}</p>
      </Container>
    </Container>
  );
};
export default Statistics;
