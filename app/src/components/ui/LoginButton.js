// @flow
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MaterialLoader from './MaterialLoader';
import '../../styles/loaders.css';

type Props = {
  siLoading: boolean,
  signInUser: Function,
  styles: Object,
}

const LoginButton = (props: Props) => {
  const { siLoading, signInUser, styles } = props;
  return siLoading === true ?
    <div className="signLoader">
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
