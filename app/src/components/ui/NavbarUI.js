// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import AuthModal from '../containers/AuthModal';
import Profile from './Profile';
import '../../styles/navbar.css';

type Props = {
  openModal: Function,
  closeModal: Function,
  updateUser: Function,
  onLogin: Function,
  onLogOut: Function,
  isLoginModalOpen: boolean,
  user: Object,
  loggedIn: boolean,
};

const NavbarUI = (props: Props) => {
  const {
    openModal,
    closeModal,
    updateUser,
    onLogin,
    onLogOut,
    isLoginModalOpen,
    user,
    loggedIn,
  } = props;

  const displayUser = loggedIn ? { display: 'block' } : { display: 'none' };

  return (
    <div className="navbar">
      <ul>
        <li>
          <Dialog
            modal={false}
            open={isLoginModalOpen}
            onRequestClose={closeModal}
            contentStyle={{ width: '350px' }}
            autoScrollBodyContent={true}
          >
            <AuthModal
              closeModal={closeModal}
              updateUser={updateUser}
              onLogin={onLogin}
            />
          </Dialog>
        </li>
        <li>
          <NavLink to="/">
            <p className="navbarLink">Home</p>
          </NavLink>
        </li>
        <li>
          <p className="navbarLink" onClick={onLogOut} style={displayUser}>Sign Out</p>
        </li>
        <li>
          <Profile
            user={user}
            openModal={openModal}
            loggedIn={loggedIn}
          />
        </li>
        <li>
          <NavLink to="/user">
            <p className="navbarLink" style={displayUser}>Calendar</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/rooms">
            <p className="navbarLink" style={displayUser}>Rooms</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUI;
