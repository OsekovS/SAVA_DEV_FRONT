import React from 'react';
import __mainMenuItem from './MenuItem/MenuItem'
import __header from '../../Common/__header/__header'
// import {NavLink} from 'react-router-dom'
import './Visio.scss';
import { checkPropTypes } from 'prop-types';

const Visio = (props) => {
    // console.log(props)
    //||Object.keys(props.paths).length===0
    const MenuItems = props.modules===undefined?null:Object.keys(props.modules).map(key => {
        return  <li>
                    {/* <NavLink to={props.paths[key]}> */}
                    <__mainMenuItem 
                        sidebar={props.sidebars[key]}
                        settings={props.modules[key].settings}
                        dbName={key}
                        head={
                            {
                                text: props.modules[key].title, 
                            }
                        } 
                        loaded={props.modules[key].loaded}
                        indexes={props.modules[key].indexes}
                        to={props.paths[key]}/>
                    {/* </NavLink> */}
                </li>
    });

    return <div className="Visio">
        <__header text={"Визуализация"} clazz="Common__header Common__header_red"/>
        <ul>
            {MenuItems}
        </ul>
    </div>
}

export default Visio;

// dbName: "iss"
// head: {text: "SAVA СЗИ «SNS»"}
// indexes: {sns_event: {…}}
// loaded: false
// settings: {sidebar: {…}, Tabels: Array(2)}
// sidebar: {sns_event:
//     active: false
//     text: "Журналы станций"
//     to: "/visualization iss"
// }
// to: {sns_event: "/visualization iss"}