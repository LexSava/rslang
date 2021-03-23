import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.scss";
import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

interface HeaderMenu {}

const Menu: React.FC<HeaderMenu> = (props) => {
  return (
    <header className="col-md-3">
      <nav className="sidebar-sticky bg-warning navbar-dark navbar-expand-md min-vh-100">
        <Link to="/" className="link-logo-block text-primary">
          <h1 className="logo text-dark pt-3">RS Lang</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto flex-column">
            <li className="nav-item active ml-3 mt-3 menu-elem">
              <Link to="" className="nav-link text-dark">
                Изучение
              </Link>
            </li>
            <li className="nav-item ml-3 mt-3 menu-elem">
              <Link to="" className="nav-link text-dark">
                Словарь
              </Link>
            </li>
            <li className="nav-item ml-3 mt-3 menu-elem">
              <Link to="" className="nav-link text-dark">
                Мини-игры
              </Link>
            </li>
            <li className="nav-item ml-3 mt-3 menu-elem">
              <Link to="" className="nav-link text-dark">
                Статистика
              </Link>
            </li>
            <li className="nav-item ml-3 mt-3 menu-elem">
              <Link to="" className="nav-link text-dark">
                Настройки
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Menu;
