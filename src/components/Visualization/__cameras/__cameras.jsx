import React from 'react';
import './__cameras.scss';
import LogElem from '../../Common/ListElem/LogElem'
import __header from '../../Common/__header/__header'
import Chart from '../../Graphs/Chart'
import Pies from '../../Graphs/Pies'
import Transform from '../../Graphs/Transform'
const __cameras = (props) => {
    const series = [ {
        data: [13, 17, 19]
    }];
      
     
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
        </div>
}

export default __cameras;