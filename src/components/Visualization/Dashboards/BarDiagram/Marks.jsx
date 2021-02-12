import React from 'react';
import moment from "moment"
export const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,innerHeight,
    innerWidth, dataLen
  }) =>{
    let barWidth =  xScale.bandwidth()
    let ticks = xScale.domain() 
    return data
        //.slice(0, data.length-1)
      .map((d,n) => {
        if(dataLen > n)
        //console.log(xScale(tickValue))
          return (
          <rect
            className="mark"
            key={n}
            x={xScale(ticks[n])-xScale.bandwidth()/4}
            y={yScale(yValue(d))}
            width={barWidth}
            height={innerHeight-yScale(yValue(d))}
          >
            <title>{moment(ticks[n]).format("DD.MM.YYYY")}</title>
          </rect>
    )})
      /*return xScale.ticks()
      .map(tickValue => (
      <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
        <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + 3}>
          {(tickValue)}
        </text>
      </g>
    ))*/
};