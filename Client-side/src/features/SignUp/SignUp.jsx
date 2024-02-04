// SignUp.js
import React, { useState } from 'react';
import Input from '../common/input';
import './style.css';
import { request, setAuthToken } from '../../Helpers/axiosHelper';
import { useNavigate } from 'react-router';

function SignUp() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate()

    const onSignUp = () => {
      console.log("sign up")
        request("POST", "/register", {
            name: name,
            login: email,
            password: password
        })
            .then((res) => {
                // Assuming the server returns a token on successful signup
                setAuthToken(res.data.token);
                // Redirect or perform other actions after successful sign-up
                navigate('/customerList')
            })
            .catch(error => console.error(error.message));
    }

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <Input className="input-container" type="text" placeholder="Name" state={name} setState={setName} />
            <Input className="input-container" type="text" placeholder="Email" state={email} setState={setEmail} />
            <Input className="input-container" type="text" placeholder="Password" state={password} setState={setPassword} />
            <button className='button' onClick={onSignUp}>Sign Up</button>
        </div>
    );
}

export default SignUp;

