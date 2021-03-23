import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.scss";
import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface HeaderMenu {}

const Menu: React.FC<HeaderMenu> = (props) => {
  return (
    // <header className="col-md-3 p-0">
    //   <nav className="sidebar-sticky bg-warning navbar-dark navbar-expand-md min-vh-100">
    //     <Link to="/" className="link-logo-block text-primary">
    //       <h1 className="logo text-dark pt-3">RS Lang</h1>
    //     </Link>

    //     <div
    //       className="collapse navbar-collapse mt-5"
    //       id="navbarSupportedContent"
    //     >
    //       <ul className="navbar-nav mr-auto flex-column">
    //         <li className="nav-item active ml-3 mt-3 menu-elem">
    //           <Link to="" className="nav-link text-dark">
    //             Изучение
    //           </Link>
    //         </li>
    //         <li className="nav-item ml-3 mt-3 menu-elem">
    //           <Link to="" className="nav-link text-dark">
    //             Словарь
    //           </Link>
    //         </li>
    //         <li className="nav-item ml-3 mt-3 menu-elem">
    //           <Link to="" className="nav-link text-dark">
    //             Мини-игры
    //           </Link>
    //         </li>
    //         <li className="nav-item ml-3 mt-3 menu-elem">
    //           <Link to="" className="nav-link text-dark">
    //             Статистика
    //           </Link>
    //         </li>
    //         <li className="nav-item ml-3 mt-3 menu-elem">
    //           <Link to="" className="nav-link text-dark">
    //             Настройки
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
    // </header>

    <Container className="p-0">
      <Nav fill variant="tabs" defaultActiveKey="#">
        <Nav.Item>
          <Nav.Link href="#" className="pt-4 pb-4 menu-elem">
            Изучение
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="pt-4 pb-4 menu-elem">
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
        <Nav.Item>
          <Nav.Link eventKey="disabled" className="pt-4 pb-4" disabled>
            Выход
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
};
export default Menu;
