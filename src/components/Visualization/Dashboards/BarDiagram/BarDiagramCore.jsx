import React from 'react';
import moment from 'moment'; 
import { extent,
         scaleBand, 
         scaleLinear, format} from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { RectSelect } from './RectSelect';

class BarDiagram extends React.Component {
constructor(props){
  super(props);
    this.state =  {
        firstPointX: 0,
        firstPointY: 0,
        secondPointX: 0,
        secondPointY: 0,
        xOffSet: 0,
        yOffSet: 0,
        isRectChanged: false
    };
    this.margin = { top: 20, right: 0,
      bottom: 65, left: 120 };
    this.onMouseDown =
        this.onMouseDown.bind(this);
    this.onMouseMove =
        this.onMouseMove.bind(this);
    this.onMouseUp =
        this.onMouseUp.bind(this);
  }

  onMouseUp(e){
    this.setState({
        isRectChanged: false
    });
  }
  onMouseMove(e) {
    let parentCoords = document.getElementsByTagName("svg")[0].getBoundingClientRect()
    this.setState({
        secondPointX: e.nativeEvent.clientX
        - this.margin.left - parentCoords.x,//screenX-180,//-335-179,//-885,
        secondPointY: e.nativeEvent.clientY
        - parentCoords.y - this.margin.top
    });
  }
  onMouseDown(e) {
    let parentCoords = document.getElementsByTagName("svg")[0].getBoundingClientRect()
    this.setState({
        firstPointX: e.nativeEvent.clientX
            - this.margin.left - parentCoords.x,//screenX-180,//-335-179,//-885,
        firstPointY: e.nativeEvent.clientY
            - parentCoords.y - this.margin.top,//screenY-74-82//-165
        isRectChanged: true
    });
  }

  render() {
    const {data, height, width} = this.props
    //20 180
    const xAxisLabelOffset = 48;
    const yAxisLabelVertOffset = -height/2+35;//-190;
    const yAxisLabelHoriztOffset = -100;
    const xTickText = 'Year'
    const yTickText = 'Population'
		const {firstPointX,
      firstPointY,
      secondPointX,
      secondPointY} = this.state,
    margin = this.margin
    if (!data) {
      return <pre>Loading...</pre>;
    }
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const yValue = d => d.doc_count;
    const xValue = d => d.date;
    const xAxisTickFormat = tickValue => { 
      //console.log(new Date(tickValue))
      return moment(tickValue)
        .format('DD.MM')//siFormat(tickValue).replace('G', 'B');
    }
    const yScale = scaleLinear()
      .domain(extent(data,yValue))
      .range([innerHeight, 0])
      .nice()

    const xScale = scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth])
      .paddingInner(0.05);

    return (
      <svg width={width} height={height}
        onMouseDown = {this.onMouseDown}
        onMouseUp = {this.onMouseUp}
        onMouseMove = {this.onMouseMove}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            nTicks={null}
            dataLen={data.length}
          />

          <AxisLeft yScale={yScale} />
          <text
            className="x-axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            Дата
          </text>
                  <text
            className="x-axis-label"
            x={yAxisLabelVertOffset}
            y={yAxisLabelHoriztOffset}
            textAnchor="middle"
                    transform={`rotate(-90)`}
          >
            Количество событий
          </text>
          <Marks
            innerHeight={innerHeight}
            innerWidth={innerWidth}
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            dataLen={data.length}
          />
          {this.state.isRectChanged?
            <RectSelect
              firstPointX={firstPointX}
              firstPointY={firstPointY}
              secondPointX={secondPointX}
              secondPointY={secondPointY}
          	/>:null}
        </g>
      </svg>
    );

  };
}

export default BarDiagram;