// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div class='signUpContainer'>
      <div className='signUpForm' >
        <form onSubmit={handleSubmit} className='signupForm'>
          <ul className='signupErr'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <h3 className='signUpTitle'>SIGN UP</h3>
            <label>
              {/* Email */}
              <input
                className='signUpFormInput'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Email'
              />
            </label>
            <label>
              {/* Username */}
              <input
                className='signUpFormInput'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Username'
              />
            </label>
            <label>
              {/* Password */}
              <input
                className='signUpFormInput'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Password'
              />
            </label>
            <label>
              {/* Confirm Password */}
              <input
                className='signUpFormInput'
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder='Confirm Password'
              />
            </label>
            <button type="submit" className='signUpFormButton'>Sign Up</button>
            <h3></h3>
        </form>
      </div>
    </div>

    // <form onSubmit={handleSubmit}>
    //   <ul>
    //     {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //   </ul>
    //   <label>
    //     Email
    //     <input
    //       type="text"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <label>
    //     Username
    //     <input
    //       type="text"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
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
    //   <label>
    //     Confirm Password
    //     <input
    //       type="password"
    //       value={confirmPassword}
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //       required
    //     />
    //   </label>
    //   <button type="submit">Sign Up</button>
    // </form>
  );
}

export default SignupFormPage;
