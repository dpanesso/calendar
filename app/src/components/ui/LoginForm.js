// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from '../../styles/materialStyles';
import SignInButton from './LoginButton';

type Props = {
  onChange: Function,
  onSubmit: Function,
  loginLoader: boolean,
  loginErrors: Object,
}

const SignInForm = (props: Props) => {
  const {
    onChange,
    onSubmit,
    loginLoader,
    loginErrors,
  } = props;
  return (
    <div>
      {loginErrors.summary && <p className="error-message">☢ {loginErrors.summary}</p>}
      <TextField
        name="email"
        hintText="email"
        floatingLabelText="email"
        onChange={onChange}
      /><br />
      <TextField
        name="password"
        type="password"
        hintText="password"
        floatingLabelText="password"
        onChange={onChange}
      /><br />
      <a href="#" style={styles.text}>Forgot your password?</a>
      <SignInButton
        siLoading={loginLoader}
        signInUser={onSubmit}
        styles={styles}
      />
    </div>
  );
};

export default SignInForm;
