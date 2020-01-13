import React from 'react';
import './__acs.scss';
import __header from '../../Common/__header/__header'
import Chart from '../../Graphs/Chart'
import Layer from '../../Graphs/Layer'
import Ticks from '../../Graphs/Ticks'
import Bars from '../../Graphs/Bars'
import LogsTableDeviceCont from '../logsTable/LogsTableDeviceCont'

class __acs extends React.Component {
  render() {
    // console.log(this.props.logs.length)

    let xLabels1
    let xLabels2
    let clientWidth = document.body.clientWidth    
    if(clientWidth<1400){
      xLabels1 = this.props.bar1.xLabels.filter((e,n) => n%2==0)
      xLabels2 = this.props.bar2.xLabels.filter((e,n) => n%2==0)
    }else{
      xLabels1 = this.props.bar1.xLabels;
      xLabels2 = this.props.bar2.xLabels;
    }
    
    console.log(this.props.pagination)
    return <div className="Visualization__cameras">
      <LogsTableDeviceCont/>
      <Chart width={ clientWidth/2} height={300} series={this.props.bar1.series} minY={0}>
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
      <Chart width={clientWidth/2} height={300} series={this.props.bar2.series} minY={0}>
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
}

export default __acs;