// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import AuthModal from '../containers/AuthModal';
import Profile from './Profile';
import '../../styles/navbar.css';

type Props = {
  isLoginModalOpen: boolean,
  openModal: Function,
  closeModal: Function,
  user: Object,
  updateUser: Function,
};

const NavbarUI = (props: Props) => {
  const {
    isLoginModalOpen,
    openModal,
    closeModal,
    user,
    updateUser,
  } = props;

  return (
    <div className="navbar">
      <ul>
        <li>
          <Profile user={user} openModal={openModal} />
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
          <p className="navbarLink">Rooms</p>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUI;
