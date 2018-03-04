// @flow
import { connect } from 'react-redux';
import { setTimelineData, startFetchTimelineData } from '../../store/actions';
import AppUI from '../ui/AppUI';


const mapStateToProps = state => (
  {
    timelineLoading: state.timeline.timelineLoading,
    timelineData: state.timeline.timelineData,
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
