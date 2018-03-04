// @flow
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import styles from '../../styles/materialStyles';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { prefixURL, customPost } from '../../appUtils/fetchHelpers';

type State = {
  value: string,
  login: {
    user: {
      email: string,
      password: string,
    },
    loading: boolean,
    errors: Object,
  },
  signUp: {
    user: {
      username: string,
      email: string,
      password: string,
      confirmPassword: string,
    },
    loading: boolean,
    errors: {},
  },
};

class AuthModal extends Component<{}, State> {
  state = {
    value: 'a',
    login: {
      user: {
        email: '',
        password: '',
      },
      loading: false,
      errors: {},
    },
    signUp: {
      user: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      loading: false,
      errors: {},
    },
  };

  onTabChange = (value: string) => {
    this.setState({ value });
  };

  onSubmitLogin = (event: Object) => {
    const { login } = this.state;
    login.loading = true;
    this.setState({ login });

    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { email, password } = login.user;
    const formData = {
      email,
      password,
    };
    const url = prefixURL('api/auth/login');
    customPost(url, formData)
      .then((response) => {
        login.errors = response.errors ? response.errors : {};
        login.loading = false;
        this.setState({ login });
      });
  }

  onSubmitSignUp = (event: Object) => {
    const { signUp } = this.state;
    signUp.loading = true;
    this.setState({ signUp });

    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const {
      username,
      email,
      password,
      confirmPassword,
    } = signUp.user;
    const formData = {
      username,
      email,
      password,
      confirmPassword,
    };
    const url = prefixURL('api/auth/signup');
    customPost(url, formData)
      .then((response) => {
        signUp.errors = response.errors ? response.errors : {};
        signUp.loading = false;
        this.setState({ signUp });
      });
  }

  onChangeLogin = (event: Object) => {
    const field = event.target.name;
    const { login } = this.state;
    login.user[field] = event.target.value;
    this.setState({ login });
  };

  onChangeSignUp = (event: Object) => {
    const field = event.target.name;
    const { signUp } = this.state;
    signUp.user[field] = event.target.value;
    this.setState({ signUp });
  };

  render() {
    return (
      <Tabs value={this.state.value} onChange={this.onTabChange}>
        <Tab label="Login" value="a" style={styles.tab}>
          <LoginForm
            onChange={this.onChangeLogin}
            onSubmit={this.onSubmitLogin}
            login={this.state.login}
          />
        </Tab>
        <Tab label="Sign-Up" value="b" style={styles.tab}>
          <SignUpForm
            onChange={this.onChangeSignUp}
            onSubmit={this.onSubmitSignUp}
            signUp={this.state.signUp}
          />
        </Tab>
      </Tabs>
    );
  }
}

export default AuthModal;
