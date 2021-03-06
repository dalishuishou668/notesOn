import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/home" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div class="login-page">
      <div class="form">
        <h3 className='loginTitle'>LOG IN</h3>
        <form onSubmit={handleSubmit} className='login-form'>
          <ul className='loginErr'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label class='inputLogin'>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder='Username or Email'
            />
          </label>
          <label class='inputLogin'>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder='Password'
            />
          </label>
          <button type="submit" className='loginFormButton'>Log In</button>
          <h3></h3>

        </form>

      </div>
    </div>
    // <form onSubmit={handleSubmit}>
    //   <ul>
    //     {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //   </ul>
    //   <label>
    //     Username or Email
    //     <input
    //       type="text"
    //       value={credential}
    //       onChange={(e) => setCredential(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Password
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <button type="submit">Log In</button>
    // </form>
  );
}

export default LoginFormPage;
