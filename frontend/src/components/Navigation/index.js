import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session';
import img from '../../images/panda_icon.jpg';
//import img from '../../images/notesOn-logos_transparent.png';
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
      <>
        <li>
          <NavLink exact to="/home" className='homeLink'>Home</NavLink>
        </li>
        <li>
          <NavLink exact to="/search" className='homeLink'>Search</NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        {/* <div className='nav1'>
          <ul> */}
        <li className='login'>
          <NavLink to="/login" className='link1'>Log In</NavLink>
        </li>
        <li className='signup'>
          <NavLink to="/signup" className='link1'>Sign Up</NavLink>
        </li>
        <li className='session'>
          <button className='demo-user-button' onClick={demoLogin}>
            Demo User
          </button>
        </li>
        {/* </ul>
        </div> */}
      </>
    );
  }

  return (
    <div className='header-bar'>
      <div className='header-bar-left'>
        <ul>
          <li className='icon'>
            <img className="iconImg" src={img} alt="loading..." />
          </li>
        </ul>
      </div>
      <div className='header-bar-right'>
        <div className='nav1'>
          <ul className='sessionLink'>
            {isLoaded && sessionLinks}
          </ul>
        </div>
        {/* <ul className='nav1'>
          <li className='sessionLink'>
            {isLoaded && sessionLinks}
          </li>
        </ul> */}
      </div>
    </div>
  );
}

export default Navigation;
