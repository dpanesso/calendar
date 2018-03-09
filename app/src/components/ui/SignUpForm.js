// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from '../../styles/materialStyles';
import SignUpButton from './SignUpButton';

type Props = {
  onChange: Function,
  onSubmit: Function,
  signupLoader: boolean,
  signupErrors: Object,
  successMessage: string,
}

const SignUpForm = (props: Props) => {
  const {
    onChange,
    onSubmit,
    signupLoader,
    signupErrors,
    successMessage,
  } = props;
  return (
    <div>
      {signupErrors.summary && <p className="error-message">☢ {signupErrors.summary}</p>}
      {successMessage && <p className="success-message">:-) {successMessage}</p>}
      <TextField
        name="username"
        hintText="username"
        floatingLabelText="username"
        errorText={signupErrors.username}
        onChange={onChange}
      /><br />
      <TextField
        name="email"
        hintText="email"
        floatingLabelText="email"
        errorText={signupErrors.email}
        onChange={onChange}
      /><br />
      <TextField
        name="password"
        type="password"
        hintText="password"
        floatingLabelText="password"
        floatingLabelStyle={styles.gray}
        floatingLabelFocusStyle={styles.blue}
        errorText={signupErrors.password ? signupErrors.password : 'Use at least 8 characters, 1 number, 1 upper and 1 lowercase'}
        errorStyle={signupErrors.password ? {} : styles.gray}
        onChange={onChange}
      /><br />
      <TextField
        name="confirmPassword"
        type="password"
        hintText="confirm password"
        floatingLabelText="confirm password"
        errorText={signupErrors.confirmPassword}
        onChange={onChange}
      /><br />
      <SignUpButton
        suLoading={signupLoader}
        signUpUser={onSubmit}
        styles={styles}
      />
    </div>
  );
};

export default SignUpForm;
