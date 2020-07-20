import React from 'react';
import './Elem.scss';
// import {DelIcon,ChangeIcon} from './Icons'
// import { tsPropertySignature } from '@babel/types';

// const ListElem = (props) => {

//     return <tr className={props.name}  >
//         <td>{props.items.admin?<img src={require('./admin.svg')} alt='Пользователь с правами администратора'></img>:<img  className='operator-avatar' src={require('./operator.svg')} alt='Пользователь с правами оператора'></img>}</td>
//         <td>{props.items.name}</td>
//         <ChangeIcon key={Object.values(props.items).length } callBack={props.elemChangeCallBack.bind(this,{id:props.items.id,mode:props.changeType})}>></ChangeIcon>
//         <DelIcon  key={Object.values(props.items).length+1} callBack={props.elemDellCallBack.bind(this,props.items.id)}></DelIcon>
//     </tr>
// }

// export default ListElem;

const ListElem = (props) => {
    let {items,first,changeType,elemDellCallBack,elemChangeCallBack,name} = props
    let Elements = Object.values(props.items).map((e,n) => {
        if(n>0 || first)
        return Array.isArray(e)?<td name='list-elem' key={n} >{e.join(', ').length>40?e.join(', ').substr(0,39)+'...':e.join(', ')}</td>:<td name='list-elem' key={n} >{e}</td>
    })
        if(elemChangeCallBack) Elements.push(<td className="icon" >
            <img onClick={elemChangeCallBack.bind(this,{id:items.id,mode:changeType})} width={20} height={20} src={require('./change_icon.png')}/>
        </td>)
        if(elemDellCallBack) Elements.push(<td className="icon" >
            <img onClick={elemDellCallBack.bind(this,{id:items.id,mode:changeType})} width={20} height={20} src={require('./del_icon.png')}/>
        </td>)
    return <tr className={name}  >
        {Elements}
    </tr>
}

export default ListElem;