import "bootstrap/dist/css/bootstrap.min.css";
import "./signin.scss";
import React, { useState } from "react";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";
interface SigninProps {
  tab: string
}

const Signin = (Props:SigninProps) => {
  const [key, setKey] = useState(Props.tab);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
      <>
      <Button 
        className={Props.tab === 'login' ? "btn btn-primary rounded-pill border border-4 btn-lg mr-3 login-button" : "rounded-pill description-btn mt-3"}
        variant={Props.tab === 'login' ? "primary" : "outline-primary"} 
        onClick={ handleShow }>
        {Props.tab === 'login' ? 'Войти' : 'Регистрация'}
      </Button>
      <Modal show={ show } onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Войдите или Зарегистрируйтесь</Modal.Title>
        </Modal.Header>
        <Tabs
        id="controlled-tab-example"
        transition={false}
        activeKey={key}
        onSelect={(k: any) => setKey(k)}>
        <Tab eventKey="register" title="Зарегистрироваться">
          <Register />
        </Tab>
        <Tab eventKey="login" title="Войти">
                    <p>user@rslang.tk</p>
          <Login />
        </Tab>
        </Tabs>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
    </>
  );
};
export default Signin;
