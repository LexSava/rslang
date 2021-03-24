import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.scss";
import React from "react";
import { Container, Nav } from "react-bootstrap";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
// const { HashRouter, Switch, Route, Link } = ReactRouterDOM;
interface InterfaceMenu {}

const Menu: React.FC<InterfaceMenu> = (props) => {
  return (
    <Container className="p-0">
      <Nav fill variant="tabs" defaultActiveKey="#">
        <Nav.Item>
          <Nav.Link href="#" className="pt-4 pb-4 menu-elem">
            Изучение
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-1" className="pt-4 pb-4 menu-elem">
            Словарь
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" className="pt-4 pb-4 menu-elem">
            Мини-игры
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3" className="pt-4 pb-4 menu-elem">
            Статистика
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4" className="pt-4 pb-4 menu-elem">
            Настройки
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};
export default Menu;
