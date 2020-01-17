import React from 'react';
import './Elem.scss';
// import {DelIcon,ChangeIcon} from './Icons'
// import { tsPropertySignature } from '@babel/types';

const ListElem = (props) => {
    let Elements = Object.values(props.items).map((e,n) => {
        if(n>0 || props.first)
        return <td name='list-elem' key={n} >{e}</td>
    })
    // if(props.name.indexOf('title')===-1){
        //
        // Elements.push(<ChangeIcon key={Object.values(props.items).length } callBack={props.elemChangeCallBack.bind(this,{id:props.items.id,mode:props.changeType})}>></ChangeIcon>)
        // Elements.push(<DelIcon  key={Object.values(props.items).length+1} callBack={props.elemDellCallBack.bind(this,props.items.id)}></DelIcon>)
        Elements.push(<td className="icon" >
            <img onClick={props.elemChangeCallBack.bind(this,{id:props.items.id,mode:props.changeType})} width={20} height={20} src={require('./change_icon.png')}/>
        </td>)
        Elements.push(<td className="icon" >
            <img onClick={props.elemDellCallBack.bind(this,{id:props.items.id,mode:props.changeType})} width={20} height={20} src={require('./del_icon.png')}/>
        </td>)
    // }
    return <tr className={props.name}  >
        {Elements}
    </tr>
}

export default ListElem;