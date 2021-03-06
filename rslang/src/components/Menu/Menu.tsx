import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.scss";
import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
interface InterfaceMenu {}

const Menu: React.FC<InterfaceMenu> = (props) => {
  return (
    <Container className="p-0">
      <Nav fill variant="tabs" defaultActiveKey="#">
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            as={Link}
            to="/tutorial-page"
            className="pt-4 pb-4 menu-elem"
          >
            Изучение
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            as={Link}
            to="/tutorial-page/vocabulary"
            className="pt-4 pb-4 menu-elem"
          >
            Словарь
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-3"
            as={Link}
            to="/tutorial-page/games"
            className="pt-4 pb-4 menu-elem"
          >
            Мини-игры
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-4"
            as={Link}
            to="/tutorial-page/statistics"
            className="pt-4 pb-4 menu-elem"
          >
            Статистика
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-5"
            as={Link}
            to="/tutorial-page/settings"
            className="pt-4 pb-4 menu-elem"
          >
            Настройки
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};
export default withRouter(Menu);
