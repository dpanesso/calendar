// @flow
import { connect } from 'react-redux';
import { setTimelineData, startFetchTimelineData } from '../../store/actions';
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
    startFetchTimelineData() {
      dispatch(startFetchTimelineData());
    },
    setTimelineData(data) {
      dispatch(setTimelineData(data));
    },
  }
);

const App = connect(mapStateToProps, mapDispatchToProps)(AppUI);

export default App;
