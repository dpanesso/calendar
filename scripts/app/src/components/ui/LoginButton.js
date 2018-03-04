// @flow
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MaterialLoader from './MaterialLoader';

type Props = {
  siLoading: boolean,
  signInUser: Function,
  styles: Object,
}

const LoginButton = (props: Props) => {
  const { siLoading, signInUser, styles } = props;
  return siLoading === true ?
    <div className="signInUpLoader">
      <MaterialLoader size={10} />
    </div> :
    <RaisedButton
      label="Submit"
      primary={true}
      style={styles.button}
      onClick={signInUser}
    />;
};

export default LoginButton;
