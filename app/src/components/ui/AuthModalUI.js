// @flow
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import styles from '../../styles/materialStyles';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { prefixURL, customPost } from '../../utils/fetchHelpers';
import { emptyLogin, emptySignup } from '../../constants';
import encrypt from '../../utils/encrypt';

type Props = {
  tabvalue: string,
  loginLoader: boolean,
  loginErrors: Object,
  login: {
    email: string,
    password: string,
  },
  signupLoader: boolean,
  signupErrors: {},
  signup: {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  },
  successMessage: string,
  closeModal: Function,
  changeTab: Function,
  updateLoginField: Function,
  submitLogin: Function,
  successLogin: Function,
  failLogin: Function,
  updateSignupField: Function,
  submitSignup: Function,
  successSignup: Function,
  failSignup: Function,
  updateUser: Function,
  onLogin: Function,
};

class AuthModalUI extends Component<Props> {
  componentDidMount() {
    this.props.updateLoginField(emptyLogin);
    this.props.updateSignupField(emptySignup);
  }

  onTabChange = () => {
    this.props.changeTab();
  };

  onSubmitLogin = (event: Object) => {
    this.props.submitLogin();

    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { email, password } = this.props.login;
    const encryptedPassword = encrypt(password, email);
    const formData = {
      email,
      password: encryptedPassword,
    };
    const url = prefixURL('api/pub/login');
    customPost(url, formData)
      .then((response) => {
        const errors = response.errors ? response.errors : {};
        if (errors.summary) this.props.failLogin(errors);
        if (response.user) {
          this.props.onLogin(response.user.meetings);
          this.props.successLogin();
          this.props.updateUser(response.user);
          this.props.closeModal();
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.failLogin({});
      });
  };

  onSubmitSignUp = (event: Object) => {
    this.props.submitSignup();

    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const {
      username,
      email,
      password,
      confirmPassword,
    } = this.props.signup;
    const formData = {
      username,
      email,
      password,
      confirmPassword,
    };
    const url = prefixURL('api/pub/signup');
    customPost(url, formData)
      .then((response) => {
        const errors = response.errors ? response.errors : {};
        if (errors.summary) {
          this.props.failSignup(errors);
        } else {
          this.props.successSignup(response.success);
          this.props.changeTab();
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.failSignup({});
      });
  };

  onChangeLogin = (event: Object) => {
    const field = event.target.name;
    const newState = Object.assign({}, this.props.login);
    newState[field] = event.target.value;
    this.props.updateLoginField(newState);
  };

  onChangeSignUp = (event: Object) => {
    const field = event.target.name;
    const newState = Object.assign({}, this.props.signup);
    newState[field] = event.target.value;
    this.props.updateSignupField(newState);
  };

  render() {
    const {
      tabvalue,
      loginLoader,
      loginErrors,
      signupLoader,
      signupErrors,
      successMessage,
    } = this.props;
    return (
      <Tabs tabvalue={tabvalue} onChange={this.onTabChange}>
        <Tab label="Login" tabvalue="a" style={styles.tab}>
          <LoginForm
            onChange={this.onChangeLogin}
            onSubmit={this.onSubmitLogin}
            loginLoader={loginLoader}
            loginErrors={loginErrors}
          />
        </Tab>
        <Tab label="Sign-Up" tabvalue="b" style={styles.tab}>
          <SignUpForm
            onChange={this.onChangeSignUp}
            onSubmit={this.onSubmitSignUp}
            signupLoader={signupLoader}
            signupErrors={signupErrors}
            successMessage={successMessage}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default AuthModalUI;
