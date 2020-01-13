import React from 'react';
import './__iss.scss';
import __header from '../../Common/__header/__header'
const __iss = (props) => {
    // let Elements = props.logs.map(e => <LogElem name='' items={e} />)
    let Elements = []
    return <div className="Visualization__cameras">
        <__header text={"Логи СЗИ"} clazz="Common__header Common__header_red"/>
            {Elements}
        </div>
}

export default __iss;