// @flow
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { isValidPassword, isValidUsername } from '../../appUtils/signInHelpers';
import styles from '../../styles/materialStyles';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';

const validator = require('validator');

type State = {
  value: string,
  siEmail: string,
  siPassword: string,
  siLoading: boolean,
  suUsername: string,
  suEmail: string,
  suPassword: string,
  suPasswordErrorStyle: {
    color: string
  },
  suConfirmPassword: string,
  suLoading: boolean,
};

class SignInModal extends Component<{}, State> {
  state = {
    value: 'a',
    siEmail: '',
    siPassword: '',
    siLoading: false,
    suUsername: '',
    suEmail: '',
    suPassword: '',
    suPasswordErrorStyle: styles.gray,
    suConfirmPassword: '',
    suLoading: false,
  };

  onTabChange = (value: string) => {
    this.setState({ value });
  };

  onPasswordChange = (event: Object, password: string) => {
    if (password && password.length > 0) {
      if (isValidPassword(password)) {
        // TODO - implement a function that will validate the other requirements
        this.setState({ suPasswordErrorStyle: styles.gray });
      } else {
        this.setState({ suPasswordErrorStyle: styles.orange });
      }
    } else {
      this.setState({ suPasswordErrorStyle: styles.gray });
    }
    this.updateInputValue(event);
  };

  updateInputValue = (event: Object) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  signInUser = () => {
    this.setState({ siLoading: true });
  }

  signUpUser = () => {
    this.setState({ suLoading: true });
  }

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.onTabChange}
      >
        <Tab label="Sign-In" value="a" style={styles.tab}>
          <div>
            <TextField
              id="siEmail"
              hintText="email"
              floatingLabelText="email"
              onChange={this.updateInputValue}
            /><br />
            <TextField
              id="siPassword"
              hintText="password"
              floatingLabelText="password"
              onChange={this.updateInputValue}
            /><br />
            <a href="#" style={styles.text}>Forgot your password?</a>
            <LoginButton
              siLoading={this.state.siLoading}
              signInUser={this.signInUser}
              styles={styles}
            />
          </div>
        </Tab>
        <Tab label="Sign-Up" value="b" style={styles.tab}>
          <div>
            <TextField
              id="suUsername"
              hintText="username"
              floatingLabelText="username"
              errorText={(this.state.suUsername === '' || isValidUsername(this.state.suUsername)) ? '' : 'Invalid username'}
              onChange={this.updateInputValue}
            /><br />
            <TextField
              id="suEmail"
              hintText="email"
              floatingLabelText="email"
              errorText={(this.state.suEmail === '' || validator.isEmail(this.state.suEmail)) ? '' : 'Invalid email'}
              onChange={this.updateInputValue}
            /><br />
            <TextField
              id="suPassword"
              hintText="password"
              floatingLabelText="password"
              floatingLabelStyle={styles.gray}
              floatingLabelFocusStyle={styles.blue}
              errorText="Use at least 8 characters, 1 number, 1 upper and 1 lowercase"
              errorStyle={this.state.suPasswordErrorStyle}
              onChange={this.onPasswordChange}
            /><br />
            <TextField
              id="suConfirmPassword"
              hintText="confirm password"
              floatingLabelText="confirm password"
              errorText={this.state.suPassword !== this.state.suConfirmPassword ? 'Passwords don\'t match.' : ''}
              onChange={this.updateInputValue}
            /><br />
            <SignUpButton
              suLoading={this.state.suLoading}
              signUpUser={this.signUpUser}
              styles={styles}
            />
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default SignInModal;
