// @flow
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TimelineXAxisTick, TimelineYAxisTick } from '../../appUtils/rechartsUtils/rechartsCusto';
import MaterialLoader from './MaterialLoader';
import '../../styles/timeline.css';
import '../../styles/loaders.css';

type Props = {
  timelineLoading: boolean,
  timelineData: Array<Object>,
}

const Timeline = (props: Props) => {
  const { timelineLoading, timelineData } = props;
  return timelineLoading === true ?
    <div className="timeline">
      <ResponsiveContainer>
        <div id="timelineLoader">
          <MaterialLoader />
        </div>
      </ResponsiveContainer>
    </div> : (
      <div className="timeline">
        <ResponsiveContainer>
          <AreaChart
            width={1000}
            height={400}
            style={
              {
                paddingBottom: '70px',
              }
            }
            data={timelineData}
            margin={
              {
                top: 10, right: 30, left: 0, bottom: 50,
              }
            }
          >
            <XAxis
              dataKey="date"
              tick={<TimelineXAxisTick />}
            />
            <YAxis
              tick={<TimelineYAxisTick />}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
};

export default Timeline;
