import React from 'react';
import './LoginScreen.css';

function LoginScreen() {
  return (
    <div className='loginScreen'>
      <div className='loginScreen__background'>
        <img
          className='loginScreen__logo'
          src="https://i.imgur.com/brdbxe7.png"
          alt="logo"
        />
        <button className='loginScreen__button'>
          Sign In
        </button>
        <div className='loginScreen__gradient'/>
      </div>

      <div className='loginScreen__body'>
        
      </div>
    </div>
  )
}

export default LoginScreen