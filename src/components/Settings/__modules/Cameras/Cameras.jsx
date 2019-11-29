import React from 'react';
import './Cameras.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
// let infra = [   
//                 {numb:'1',name:'Санаторий Звенигород'},
//                 {numb:'2',name:'Больница №46'}
//             ]
// let cameras = [{object:'Санаторий',name:'Холл',ip:'192.168.3.11',login:'admin'},
// {object:'Крематорий',name:'Вход',ip:'666.168.3.11',login:'a2min'}]
const Cameras = (props) => {
    console.log(props);
    let objectsElements = props.cameras.objects.map(e => <ListElem name='' items={e} />)
    let camerasElements = props.cameras.cameras.map(e => <ListElem name='' items={e} />)
    let registratorsElements = props.cameras.registrators.map(e => <ListElem name='' items={e} />)
    return <div >
        <__header text={"Объекты инфраструктуры"} clazz="Common__header Common__header_red"/>
        {objectsElements}
        <__header text={"Список камер"} clazz="Common__header Common__header_red"/>
        {camerasElements}
        <__header text={"Список регистраторов"} clazz="Common__header Common__header_red"/>
        {registratorsElements}
        </div>
}

export default Cameras;