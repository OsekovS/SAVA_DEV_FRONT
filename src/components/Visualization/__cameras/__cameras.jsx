import React from 'react';
import './__cameras.scss';
import LogElem from '../../Common/ListElem/LogElem'
import __header from '../../Common/__header/__header'

const __cameras = (props) => {
    // console.log(props)
    let usersElements = props.logs.map(e => <LogElem name='' items={e} />)
    return <div className="Visualization__cameras">
        <__header text={"Логи камер"} clazz="Common__header Common__header_red"/>
            {usersElements}
        </div>
}

export default __cameras;