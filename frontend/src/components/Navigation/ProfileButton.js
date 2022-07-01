// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>

      <button onClick={openMenu} className='profileBtn'>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="nav_profile-menu">
        <span>
          <h4>Username:</h4>
          <li>{user.username}</li>
        </span>
        <span>
          <h4>Email:</h4>
          <li>{user.email}</li>
        </span>
        <span>
          <button className='logout-button' onClick={logout}>Log Out</button>
        </span>
      </div>
      )}
    </>
  );
}

export default ProfileButton;
