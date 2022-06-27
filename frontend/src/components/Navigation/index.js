import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  let history = useHistory();
  const dispatch = useDispatch();
  let sessionLinks;

  const demoLogin = async () => {
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }));
  }


  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li>
          <button className='demo-user-button' onClick={demoLogin}>
            Demo User
          </button>
        </li>
      </>
    );
  }

  return (
    <div className='header-bar'>
      <ul className='header-bar-left'>
        <li>
          <NavLink exact to="/home" className='homeLink'>Home</NavLink>
        </li>
      </ul>
      <ul>
        <li className='header-bar-right'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
