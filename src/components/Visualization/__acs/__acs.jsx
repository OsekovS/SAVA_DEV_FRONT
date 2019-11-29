import React from 'react';
import './__acs.scss';
import LogElem from '../../Common/ListElem/LogElem'
import __header from '../../Common/__header/__header'
const __acs = (props) => {
    let Elements = props.logs.map(e => <LogElem name='' items={e} />)
    return <div className="Visualization__cameras">
        <__header text={"Логи СКУД"} clazz="Common__header Common__header_red"/>
            {Elements}
        </div>
}

export default __acs;