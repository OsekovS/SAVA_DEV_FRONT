import React from 'react';
import './Elem.scss';
import {DelIcon,ChangeIcon} from './Icons'
import { tsPropertySignature } from '@babel/types';

const ListElem = (props) => {
    console.log(props)
    // let Elements = Object.values(props.items).map((e,n) => {
    //     if(n>0 || props.first)
    //     return <td name='list-elem' key={n} >{e}</td>
    // })
    // if(props.name.indexOf('title')===-1){
        // Elements.push(<ChangeIcon key={Object.values(props.items).length } callBack={props.elemChangeCallBack.bind(this,{id:props.items.id,mode:props.changeType})}>></ChangeIcon>)
        // Elements.push(<DelIcon  key={Object.values(props.items).length+1} callBack={props.elemDellCallBack.bind(this,props.items.id)}></DelIcon>)
    // }
    // return <tr className={props.name}  >
    //     {Elements}
    // </tr>
    return <tr className={props.name}  >
        <td>{props.items.admin?<img src={require('./admin.svg')} alt='Пользователь с правами администратора'></img>:<img  className='operator-avatar' src={require('./operator.svg')} alt='Пользователь с правами оператора'></img>}</td>
        <td>{props.items.name}</td>
        <ChangeIcon key={Object.values(props.items).length } callBack={props.elemChangeCallBack.bind(this,{id:props.items.id,mode:props.changeType})}>></ChangeIcon>
        <DelIcon  key={Object.values(props.items).length+1} callBack={props.elemDellCallBack.bind(this,props.items.id)}></DelIcon>
    </tr>
}

export default ListElem;