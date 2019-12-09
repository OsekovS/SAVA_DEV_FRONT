import React from 'react';
import './__cameras.scss';
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
const __cameras = (props) => {
    const series = [ {
        data: [13, 17, 19]
    }];
    const series2 = [{
      name: '14:00',
      data: [1, 2, 3]
    }, {
      name: '15:00',
      data: [5, 7, 11]
    }, {
      name: '16:00',
      data: [13, 17, 19]
    }];
    // const series2 = [{
    //   data: [1, 2, 3]
    // }, {
    //   data: [5, 7, 11]
    // }, {
    //   data: [13, 17, 19]
    // }];
    
    // console.log(props)
    let usersElements = props.logs.map(e => <LogElem name='' items={e} />)
    return <div className="Visualization__cameras">
        <header className="Common__header Common__header_red">Логи камер</header>
            {usersElements}
            <Chart width={600} height={250} series={series}>
              <Transform method={['transpose', 'stack']}>
                <Pies combined={true} />
              </Transform>
            </Chart>
            <Chart width={600} height={300} series={series2} minY={0}>
              <Layer width='80%' height='90%' position='top center'>
                
                <Ticks
                  axis='y'
                  lineLength='100%'
                  lineVisible={true}
                  lineStyle={{stroke:'lightgray'}}
                  labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray'}}
                  labelAttributes={{x: -5}}
                />
                <Ticks
                  axis='x'
                  label={({index, props}) => props.series[index].name}
                  labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'lightgray'}}
                  labelAttributes={{y: 3}}
                />
               
                 <Lines />
                  <Dots />
              </Layer>
            </Chart>
            {/* <Chart width={600} height={250} minY={0} series={series2}>
            <Layer width='90%' height='90%'>
              <Bars opacity={0.5} />
              <Lines />
              <Dots />
            </Layer>
          </Chart>; */}
        </div>
}

export default __cameras;