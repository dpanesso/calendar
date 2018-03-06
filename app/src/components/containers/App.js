// @flow
import { connect } from 'react-redux';
import {
  openUserModal,
  closeUserModal,
  updateUserField,
  submitUserEvent,
} from '../../store/actions';
import AppUI from '../ui/AppUI';


const mapStateToProps = state => (
  {
    userOpenNew: state.userOpenNew,
    userOpenUpdate: state.userOpenUpdate,
    userBuffer: state.userBuffer,
    userEvents: state.userEvents,
  }
);

const mapDispatchToProps = dispatch => (
  {
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
