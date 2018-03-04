// @flow
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import AuthModal from './AuthModal';
import '../../styles/navbar.css';

type State = {
  open: boolean,
};

const customContentStyle = {
  width: '350px',
};

class NavBar extends Component<{}, State> {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div id="navbar">
        <ul>
          <li>
            <p id="loginButton" onClick={this.handleOpen}>Login</p>
            <Dialog
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              contentStyle={customContentStyle}
              autoScrollBodyContent={true}
            >
              <AuthModal />
            </Dialog>
          </li>
          <li>
            <p className="navbarLink">About</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
