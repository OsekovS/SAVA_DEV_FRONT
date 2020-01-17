import React from 'react';
import './Elem.scss';
import {DelIcon,ChangeIcon} from './Icons'
import { tsPropertySignature } from '@babel/types';

const ListElem = (props) => {

    return <tr className={props.name}  >
        <td>{props.items.admin?<img src={require('./admin.svg')} alt='Пользователь с правами администратора'></img>:<img  className='operator-avatar' src={require('./operator.svg')} alt='Пользователь с правами оператора'></img>}</td>
        <td>{props.items.name}</td>
        <ChangeIcon key={Object.values(props.items).length } callBack={props.elemChangeCallBack.bind(this,{id:props.items.id,mode:props.changeType})}>></ChangeIcon>
        <DelIcon  key={Object.values(props.items).length+1} callBack={props.elemDellCallBack.bind(this,props.items.id)}></DelIcon>
    </tr>
}

export default ListElem;