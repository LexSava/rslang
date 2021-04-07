import "bootstrap/dist/css/bootstrap.min.css";
import "./signin.scss";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from 'react-router';


interface SigninProps {
}



const SignOut = (Props:SigninProps) => {
  const [isLoged, setLoged] = useState(true);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userpic');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    setLoged(false)
  };

  return (
      <>
      {!isLoged && <Redirect to="/"/>}
      <Button 
        className="btn btn-danger rounded-pill border border-0 btn-lg mr-3 login-button"
        onClick={ handleSignOut }>
        Выйти
      </Button>
    </>
  );
};
export default SignOut;
