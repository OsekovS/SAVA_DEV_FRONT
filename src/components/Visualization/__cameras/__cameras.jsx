import React from 'react';
import './__cameras.scss';
import LogElem from '../../Common/ListElem/LogElem'
import __header from '../../Common/__header/__header'
import Chart from '../../Graphs/Chart'
import Bars from '../../Graphs/Bars'

const __cameras = (props) => {
    const series = [{
        data: [1, 2, 3]
      }];
      
     
    // console.log(props)
    let usersElements = props.logs.map(e => <LogElem name='' items={e} />)
    return <div className="Visualization__cameras">
        <header className="Common__header Common__header_red">Логи камер</header>
            {usersElements}
            <Chart width={600} height={250} minY={0} series={series}>
            <Bars />
            </Chart>
        </div>
}

export default __cameras;