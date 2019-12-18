import React from 'react';
import './__acs.scss';
import LogElem from '../../Common/ListElem/LogElem'
import __header from '../../Common/__header/__header'
import Chart from '../../Graphs/Chart'
import Pies from '../../Graphs/Pies'
import Transform from '../../Graphs/Transform'
import Layer from '../../Graphs/Layer'
import Ticks from '../../Graphs/Ticks'
import Bars from '../../Graphs/Bars'
import Lines from '../../Graphs//Lines'
import Dots from '../../Graphs/Dots'

const __acs = (props) => {

console.log(props)
    let Elements = props.logs.map(e => <LogElem name='' items={e} />)
    // console.log(series2)
    return <div className="Visualization__cameras">
        <__header text={"Логи СКУД"} clazz="Common__header Common__header_red"/>
        <div className='table-wrapper'>
          <table className="Modules_table Modules_table__cam-dev">
              <tbody>
                  {Elements}  
              </tbody>
          </table>
        </div>
        <Chart width={ document.body.clientWidth/2} height={300} series={props.bar1.series} minY={0}>
          <Layer width='90%' height='90%' position='top center'>
            <Ticks
              axis='y'
              lineLength='100%'
              lineVisible={true}
              lineStyle={{stroke:'lightgray'}}
              labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
              labelAttributes={{x: -5}}
              labelFormat={label => label}
            />
            {/* series.xLabels */}
            <Ticks
              axis='x'
              labels = {props.bar1.xLabels}
                  label={({index, props}) => props.labels[index]}
              labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'black',fontSize:'0.7em'}}
              labelAttributes={{y: 3}}
            />
            <Bars
              groupPadding='0%'
              innerPadding='0.3%'
            />
          </Layer>
        </Chart>
        <Chart width={document.body.clientWidth/2} height={300} series={props.bar2.series} minY={0}>
          <Layer width='90%' height='90%' position='top center'>
            <Ticks
              axis='y'
              lineLength='100%'
              lineVisible={true}
              lineStyle={{stroke:'lightgray'}}
              labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
              labelAttributes={{x: -5}}
              labelFormat={label => label}
            />
            {/* series.xLabels */}
            <Ticks
              axis='x'
              labels = {props.bar2.xLabels}
                  label={({index, props}) => props.labels[index]}
              labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'black',fontSize:'0.7em'}}
              labelAttributes={{y: 3}}
            />
            <Bars
              groupPadding='0%'
              innerPadding='0.3%'
            />
          </Layer>
        </Chart>
        </div>
}

export default __acs;