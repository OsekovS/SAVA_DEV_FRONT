import React from 'react';
export const AxisBottom =
      ({ xScale, innerHeight,
       tickFormat}) =>
  xScale.domain().map((tickValue, n) => (
    <g className="tick">
      <text
        key={n}
        style={{ textAnchor: 'middle' }}
        y={innerHeight+20}
        dx=".32em"
        x={xScale(tickValue) }
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));