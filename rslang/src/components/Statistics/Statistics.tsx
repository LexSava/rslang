import "bootstrap/dist/css/bootstrap.min.css";
import "./Statistics.scss";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import getUserData from "../../api/getUserData";
import useLocalStorage from "../../hooks/useLocalStorage";
import { url } from "../../api/defData";
import { Bar, Line, Pie } from "react-chartjs-2";

interface InterfaceStatistics {
  learnedWords: any;
}
interface dataInterface {
  id: string;
}

const Statistics: React.FC<InterfaceStatistics> = (props) => {
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [token, setToken] = useLocalStorage("token", "");
  const [username, setUserName] = useLocalStorage("username", "");
  const [userpic, setUserPic] = useLocalStorage("userpic", "");
  const [statistics, setStatistics] = useLocalStorage("statistics", {});
  const [allWords, setAllWord] = useState<any>(props.learnedWords);

  const ARRAY_OF_DATES: any = [];
  const D = new Date("04/01/2021");
  const Till = new Date();

  const [barData, setBarData] = useState({
    labels: ARRAY_OF_DATES,
    datasets: [
      {
        label: "Выучено слов",
        data: [0, allWords.length],
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
        borderWidth: 5,
      },
    ],
  });

  function pad(s: any) {
    return `00${s}`.slice(-2);
  }

  useEffect(() => {
    while (D.getTime() < Till.getTime()) {
      ARRAY_OF_DATES.push(
        `${D.getFullYear()}-${pad(D.getMonth() + 1)}-${pad(D.getDate())}`
      );
      D.setDate(D.getDate() + 1);
    }
  }, [Till]);

  async function getStatistic(url: string, bearerToken: string) {
    const fullUrl = `${url}users/${userId}/statistics`;
    await getUserData(fullUrl, bearerToken)
      .then((responseData: any) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // getStatistic(url, token)

  return (
    <Container className="min-vh-100 p-0 border border-top-0">
      <Container className="statistics-page-head-block bg-light d-flex flex-wrap">
        <h2 className="statistics-page-head p-3 text-warning">Статистика</h2>
      </Container>
      <Container>
        <h2 className="mt-4">{"Статистика пользователя - " + username}</h2>

        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>{"Статистика пользователя - " + username}</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Пройдено карточек за все время</td>
              <td>{allWords.length}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Лучшая серия</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Процент правильных ответов</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Изучено новых слов</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container className="BarExample">
        <Line
          data={barData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    min: 0,
                    stepSize: 1,
                  },
                  type: "time",
                  distribution: "series",
                  time: {
                    minUnit: "week",
                    unit: "week",
                    unitStepSize: 1,
                    min: "start",
                    max: "end",
                  },
                },
              ],
            },
            title: {
              display: true,
              text: "Изучено новых слов",
              fontSize: 25,
            },
            legend: {
              display: true,
              position: "top",
            },
          }}
        />
      </Container>
    </Container>
  );
};
export default Statistics;
