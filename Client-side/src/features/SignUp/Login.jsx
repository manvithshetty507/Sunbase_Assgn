// Login.js
import React, { useState } from 'react';
import Input from '../common/input';
import './style.css';
import { request, setAuthToken } from '../../Helpers/axiosHelper';
import { useNavigate } from 'react-router';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const onLogin = () => {
    request("POST", "/login", { login: email, password: password.split('') })
      .then((res) => {
        console.log('Login Response:', res);
        const token = res.data.token;
        window.localStorage.removeItem('auth_token')
        console.log('Received Token:', token);
        setAuthToken(token);
        navigate('/customerList')
      })
      .catch((error) => console.error(error.message));
  }
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <Input className="input-container" type="text" placeholder="Email" state={email} setState={setEmail} />
      <Input className="input-container" type="text" placeholder="Password" state={password} setState={setPassword} />
      <button className='button' onClick={onLogin}>Login</button>
    </div>
  );
}

export default Login;