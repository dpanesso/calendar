// @flow
import React from 'react';

// TODO - find the right syntax for flow destructured arguments
// type TimelineAxisProps = {
//   x: string,
//   y: string,
//   payload: {value: number},
// }
// export const TimelineXAxisTick = ({ x, y, payload }: TimelineAxisProps) => (

export const TimelineXAxisTick = ({ x, y, payload }: any) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      textAnchor="end"
      fill="#666"
      transform="rotate(-35)"
      fontSize="0.80em"
    >
      {payload.value}
    </text>
  </g>
);


export const TimelineYAxisTick = ({ x, y, payload }: any) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={5}
      textAnchor="end"
      fill="#666"
      fontSize="0.80em"
    >
      {payload.value}
    </text>
  </g>
);
