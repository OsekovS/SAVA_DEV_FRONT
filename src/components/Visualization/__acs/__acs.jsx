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


let series = {bar2: {series: [{
  data: [13, 17, 19]           
  }],
  xLabels : ['xz','e','x']
}}

    let xLabels1
    let xLabels2
    let Elements = props.logs.map(e => <LogElem name='' items={e} />)
    let clientWidth = document.body.clientWidth
    if(clientWidth<1400){
      xLabels1 = props.bar1.xLabels.filter((e,n) => n%2==0)
      xLabels2 = props.bar2.xLabels.filter((e,n) => n%2==0)
    }else{
      xLabels1 = props.bar1.xLabels;
      xLabels2 = props.bar2.xLabels;
    }
    console.log(xLabels1)
    console.log(xLabels2)
    return <div className="Visualization__cameras">
        <__header text={"Логи СКУД"} clazz="Common__header Common__header_red"/>
        <div className='table-wrapper'>
          <table className="Modules_table Modules_table__cam-dev">
              <tbody>
                  {Elements}  
              </tbody>
          </table>
        </div>
        {/* props.bar1.series */}
        <Chart width={ clientWidth/2} height={300} series={props.bar1.series} minY={0}>
          <Layer width='90%' height='90%' position='top center'>
            <Ticks
              axis='y'
              lineLength='100%'
              // maxTicks = {clientWidth<1400? 12:24}
              //ticks={{minDistance:1.6}}
              lineVisible={true}
              lineStyle={{stroke:'lightgray'}}
              labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
              labelAttributes={{x: -5}}
              labelFormat={label => label}
            />
            {/* xLabels2 */}
            <Ticks
              axis='x'
              ticks={{maxTicks:clientWidth<1400? 12:24}}
              // maxTicks = {clientWidth<1400? 12:24}
              labels = {xLabels1}
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
        <Chart width={clientWidth/2} height={300} series={props.bar2.series} minY={0}>
          <Layer width='90%' height='90%' position='top center'>
            <Ticks
              axis='y'
              lineLength='100%'
              // ticks={{maxTicks:24}}
              // maxTicks = {clientWidith<1400? 12:24}
              lineVisible={true}
              lineStyle={{stroke:'lightgray'}}
              labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
              labelAttributes={{x: -5}}
              labelFormat={label => label}
            />
            {/* series.xLabels */}
            <Ticks
              axis='x'
              ticks={{maxTicks:clientWidth<1400? 12:24}}
              // maxTicks = {clientWidth<1400? 12:24}
              labels = {xLabels2}
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