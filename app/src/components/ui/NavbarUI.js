// @flow
import React from 'react';
import Dialog from 'material-ui/Dialog';
import AuthModal from '../containers/AuthModal';
import '../../styles/navbar.css';

type Props = {
  isLoginModalOpen: boolean,
  openModal: Function,
  closeModal: Function,
};

const NavbarUI = (props: Props) => {
  const {
    isLoginModalOpen,
    openModal,
    closeModal,
  } = props;

  return (
    <div id="navbar">
      <ul>
        <li>
          <p id="loginButton" onClick={openModal}>Login</p>
          <Dialog
            modal={false}
            open={isLoginModalOpen}
            onRequestClose={closeModal}
            contentStyle={{ width: '350px' }}
            autoScrollBodyContent={true}
          >
            <AuthModal closeModal={closeModal} />
          </Dialog>
        </li>
        <li>
          <p className="navbarLink">About</p>
        </li>
      </ul>
    </div>
  );
};

export default NavbarUI;
