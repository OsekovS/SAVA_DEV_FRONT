import React from 'react';
import {NavLink} from 'react-router-dom'

const Elem = (props) => {
    let clazz=''

    if(props.active) clazz += " aside-panel__item_active"
    return (
        <NavLink  to={props.to}>
            <li onClick={props.callBack} className={clazz}>
                {props.text}
            </li>        
        </NavLink> 
    )
}
      

export default Elem;
