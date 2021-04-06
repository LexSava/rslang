import "bootstrap/dist/css/bootstrap.min.css";
import "./TutorialPage.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { url } from "../../api/defData";
import Menu from "../Menu/Menu";
import Main from "../Main/Main";
import SignOut from "../Signin/SignOut";
interface InterfaceTutorialPage {}

const TutorialPage: React.FC<InterfaceTutorialPage> = (props) => {
  const avatar: string | null = localStorage.getItem("userpic") || "";
  const avatarUrl = `${url}${JSON.parse(avatar)}`;

  return (
    <Container className="min-vh-100">
      <Container className="bg-warning p-3 d-flex justify-content-between">
        <Link to="/" className="link-logo-block text-primary">
          <h1 className="logo-tutorial-page text-dark m-0">RS Lang</h1>
        </Link>
        {avatar && <img className="avatar" src={avatarUrl} alt="avatar" />}
        <SignOut />
      </Container>
      <Menu />
      <Main />
    </Container>
  );
};
export default TutorialPage;
