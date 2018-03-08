// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import AuthModal from '../containers/AuthModal';
import Profile from './Profile';
import '../../styles/navbar.css';

type Props = {
  openModal: Function,
  closeModal: Function,
  updateUser: Function,
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
            <AuthModal closeModal={closeModal} updateUser={updateUser} />
          </Dialog>
        </li>
        <li>
          <p className="navbarLink">Home</p>
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
          <p className="navbarLink" style={displayUser}>Calendar</p>
        </li>
        <li>
          <p className="navbarLink" style={displayUser}>Rooms</p>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUI;
