import React from 'react';
import './Elem.scss';
import {DelIcon,ChangeIcon} from './Icons'
import { tsPropertySignature } from '@babel/types';

const ListElem = (props) => {
    // console.log(props)
    let Elements = Object.values(props.items).map((e,n) => {
        if(n>0)
        return <td name='list-elem' key={n} >{e}</td>
    })
    if(props.name.indexOf('title')===-1){
        Elements.push(<ChangeIcon key={Object.values(props.items).length}></ChangeIcon>)
        Elements.push(<DelIcon  key={Object.values(props.items).length+1} callBack={props.elemDellCallBack.bind(this,props.items.id)}></DelIcon>)
        // Elements.push(<ChangeIcon callBack={props.elemChangeCallBack.bind(this,props.key)}></ChangeIcon>)
        // Elements.push(<DelIcon callBack={props.elemDellCallBack.bind(this,props.key)}></DelIcon>)
    }
    return <tr className={props.name}  >
        {Elements}
        
        
    </tr>
    //callBack={props.elemChangeCallBack} callBack={props.elemDellCallBack}
}

export default ListElem;

// const ListElem = (props) => {

//     return <li className={props.name}  
//     dangerouslySetInnerHTML={createMarkup(
//         Object.values(props.items).reduce(gen,'') +
//         '<img width=20 height=20 src="'+require('./change_icon.png')+'"/><img width=20 height=20 src="'+require('./del_icon.png')+'"/>'
//         )}>
       
//     </li>
// }

// const gen = (accumulator, currentValue) => {
//     accumulator += '<span>'+currentValue+'</span>';
// return accumulator;
// }