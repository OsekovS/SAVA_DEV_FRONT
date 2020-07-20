import React from 'react';
import {NavLink} from 'react-router-dom'

const Elem = (props) => {
    let clazz=''
    // console.log(props)
    if(props.active) clazz += "active"
    else if(props.isCurrentModule) clazz += "CurrentModule"
    return (
        // ()=>{props.callBack();console.log('!!')}
        <NavLink  to={props.to}>
            <li onClick={props.clickFunc} className={clazz} >
                <p>{props.index}</p>
                <p>{"("+props.module+")"}</p>
            </li>        
        </NavLink> 
    )
}
      

export default Elem;
