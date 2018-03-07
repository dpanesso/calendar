// @flow
import { connect } from 'react-redux';
import {
  openUserModal,
  closeUserModal,
  updateUserField,
  submitUserEvent,
  updateUserData,
  toggleDapp,
} from '../../store/actions';
import AppUI from '../ui/AppUI';


const mapStateToProps = state => (
  {
    toggleDapp: state.toggleDapp,
    userOpenNew: state.userOpenNew,
    userOpenUpdate: state.userOpenUpdate,
    userBuffer: state.userBuffer,
    userEvents: state.userEvents,
    user: state.user,
  }
);

const mapDispatchToProps = dispatch => (
  {
    updateUser(user) {
      dispatch(updateUserData(user));
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
      dispatch(toggleDapp())
    },
  }
);

const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);

export default App;
