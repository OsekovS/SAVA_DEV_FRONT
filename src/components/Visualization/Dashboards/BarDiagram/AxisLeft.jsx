import React from 'react';
export const AxisLeft = ({ yScale }) =>{

	return yScale.ticks().map(tickValue => {
        
    return (
    <g className="tick">
      <text
        key={tickValue}
        style={{ textAnchor: 'end' }}
        x={-50}
        dy=".32em"
        y={yScale(tickValue) }
      >
        {tickValue}
      </text>
    </g>
  )})
};