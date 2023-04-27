import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate()

  const handleUserLogin = () => {
    navigate('/user-dashboard');
  };

  const handleHostLogin = () => {
    navigate('/host-dashboard');
  };
  return (
    <div className="login-page">
      <h1 className="login-heading">Login to Charge or Let Charge</h1>
      <div className="button-container">
        <button className="user-button" onClick={handleUserLogin}>Login as User</button>
        <button className="host-button" onClick={handleHostLogin}>Login as Host</button>
      </div>
    </div>
  );
}

export default LoginPage;