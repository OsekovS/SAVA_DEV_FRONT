import React from 'react';
import './Acs.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
const Acs = (props) => {
    // console.log(props)
    let objectsElements= props.acs.objects.map(e => <ListElem name='' items={e} />)
    let endpointsElemens= props.acs.endpoints.map(e => <ListElem name='' items={e} />)
    return <div >
            <__header text={"Объекты инфраструктуры"} clazz="Common__header Common__header_red"/>
            {objectsElements}
            <__header text={"Список конечных точек"} clazz="Common__header Common__header_red"/>
            {endpointsElemens}
        </div>
}

export default Acs;