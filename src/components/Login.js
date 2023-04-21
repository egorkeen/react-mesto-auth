import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login(props) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);

    props.onSignIn({
      email: email,
      password: password
    })
  }

  return(
    <div className="page">
      <Header>
        <div className='header__container'>
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </div>
      </Header>
      <form onSubmit={handleSubmit} className="start-form" name="login-form">
        <h1 className='start-form__title'>Вход</h1>
        <input onChange={handleEmailChange} type='email' name='email' value={email} className="start-form__input" placeholder='Email' />
        <input onChange={handlePasswordChange} type='password' name='password' value={password} className="start-form__input" placeholder='Пароль' />
        <div className='start-form__container'>
          <button type='submit' className="start-form__submit-button">Войти</button>
          <Link to="sign-up" className="start-form__link" />
        </div>
      </form>
    </div>
  );
};

export default Login;