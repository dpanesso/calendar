// @flow
import React, { Component } from 'react';
import Timeline from './Timeline';
import Navbar from './Navbar';
import jsonToRecharts from '../../appUtils/rechartsUtils/dataConversion';
import { prefixURL, customFetch } from '../../appUtils/fetchHelpers';

type AppUIProps = {
  timelineLoading: boolean,
  timelineData: Array<Object>,
  startFetchTimelineData: Function,
  setTimelineData: Function
}

class AppUI extends Component<AppUIProps> {
  componentDidMount() {
    this.props.startFetchTimelineData();
    const url = prefixURL('api/data/timeline');
    customFetch(url)
      .then(response => jsonToRecharts(response))
      .then((data) => {
        this.props.setTimelineData(data);
      });
  }

  render() {
    const { timelineLoading, timelineData } = this.props;
    return (
      <div className="App">
        <Navbar />
        <Timeline timelineLoading={timelineLoading} timelineData={timelineData} />
      </div>
    );
  }
}

export default AppUI;
