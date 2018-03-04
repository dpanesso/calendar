// @flow
import React from 'react';
import TextField from 'material-ui/TextField';
import styles from '../../styles/materialStyles';
import SignUpButton from './SignUpButton';

type Props = {
  onChange: Function,
  onSubmit: Function,
  signUp: Object,
}

const SignUpForm = (props: Props) => {
  const { onChange, onSubmit, signUp } = props;
  const { errors } = signUp;
  const { loading } = signUp;
  return (
    <div>
      {errors.summary && <p className="error-message">☢ {errors.summary}</p>}
      <TextField
        name="username"
        hintText="username"
        floatingLabelText="username"
        errorText={errors.username}
        onChange={onChange}
      /><br />
      <TextField
        name="email"
        hintText="email"
        floatingLabelText="email"
        errorText={errors.email}
        onChange={onChange}
      /><br />
      <TextField
        name="password"
        hintText="password"
        floatingLabelText="password"
        floatingLabelStyle={styles.gray}
        floatingLabelFocusStyle={styles.blue}
        errorText={errors.password ? errors.password : 'Use at least 8 characters, 1 number, 1 upper and 1 lowercase'}
        errorStyle={errors.password ? {} : styles.gray}
        onChange={onChange}
      /><br />
      <TextField
        name="confirmPassword"
        hintText="confirm password"
        floatingLabelText="confirm password"
        errorText={errors.confirmPassword}
        onChange={onChange}
      /><br />
      <SignUpButton
        suLoading={loading}
        signUpUser={onSubmit}
        styles={styles}
      />
    </div>
  );
};

export default SignUpForm;
