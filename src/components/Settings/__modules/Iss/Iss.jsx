import React from 'react';
import './Iss.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
const Iss = (props) => {
    // console.log(props)
    let endpointsElements = props.endpoints.map(e => <ListElem name='' items={e} />)
    let objectsElements = props.objects.map(e => <ListElem name='' items={e} />)
    return <div >
            <__header text={"Объекты инфраструктуры"} clazz="Common__header Common__header_red"/>
            {objectsElements}
            <__header text={"Список конечных точек"} clazz="Common__header Common__header_red"/>
            {endpointsElements}
        </div>
}

export default Iss;