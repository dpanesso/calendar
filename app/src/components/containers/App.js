// @flow
import { connect } from 'react-redux';
import { startUpdateCalendar, fieldUpdateCalendar } from '../../store/actions';
import AppUI from '../ui/AppUI';


const mapStateToProps = state => (
  {
    open: state.userMeetingCalendar.open,
    buffer: state.userMeetingCalendar.buffer,
    userEvents: state.userMeetingCalendar.userEvents,
  }
);

const mapDispatchToProps = dispatch => (
  {
    startUpdate() {
      dispatch(startUpdateCalendar());
    },
    fieldUpdate(data) {
      dispatch(fieldUpdateCalendar(data));
    },
  }
);

const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);

export default App;
