// @flow
import { connect } from 'react-redux';
import {
  openUserModal,
  closeUserModal,
  updateUserField,
  submitUserEvent,
  updateUserData,
  logOutUser,
} from '../../store/actions';
import AppUI from '../ui/AppUI';


const mapStateToProps = state => (
  {
    userOpenNew: state.userOpenNew,
    userOpenUpdate: state.userOpenUpdate,
    userBuffer: state.userBuffer,
    userEvents: state.userEvents,
    user: state.user,
    loggedIn: state.loggedIn,
  }
);

const mapDispatchToProps = dispatch => (
  {
    updateUser(user) {
      dispatch(updateUserData(user));
    },
    logOut() {
      dispatch(logOutUser());
    },
    openModal(kind, event) {
      dispatch(openUserModal(kind, event));
    },
    closeModal() {
      dispatch(closeUserModal());
    },
    updateField(field, value) {
      dispatch(updateUserField(field, value));
    },
    submitEvent(event) {
      dispatch(submitUserEvent(event));
    },
  }
);

const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);

export default App;
