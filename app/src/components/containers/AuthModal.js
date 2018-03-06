// @flow
import { connect } from 'react-redux';
import {
  changeLoginTab,
  updateUserLoginField,
  submitUserLogin,
  successUserLogin,
  failUserLogin,
  updateUserSignupField,
  submitUserSignup,
  successUserSignup,
  failUserSignup,
} from '../../store/actions';
import AuthModalUI from '../ui/AuthModalUI';


const mapStateToProps = state => (
  {
    tabvalue: state.tabvalue,
    loginLoader: state.loginLoader,
    loginErrors: state.loginErrors,
    login: state.login,
    signupLoader: state.signupLoader,
    signupErrors: state.signupErrors,
    signup: state.signup,
  }
);

const mapDispatchToProps = dispatch => (
  {
    changeTab() {
      dispatch(changeLoginTab());
    },
    updateLoginField(login) {
      dispatch(updateUserLoginField(login));
    },
    submitLogin() {
      dispatch(submitUserLogin());
    },
    successLogin() {
      dispatch(successUserLogin());
    },
    failLogin(errors) {
      dispatch(failUserLogin(errors));
    },
    updateSignupField(signup) {
      dispatch(updateUserSignupField(signup));
    },
    submitSignup() {
      dispatch(submitUserSignup());
    },
    successSignup() {
      dispatch(successUserSignup());
    },
    failSignup(errors) {
      dispatch(failUserSignup(errors));
    },
  }
);

const AuthModal = connect(mapStateToProps, mapDispatchToProps)(AuthModalUI);

export default AuthModal;
