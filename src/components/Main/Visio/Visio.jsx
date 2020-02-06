import React from 'react';
import __mainMenuItem from './MenuItem/MenuItem'
import __header from '../../Common/__header/__header'
// import {NavLink} from 'react-router-dom'
import './Visio.scss';
import { checkPropTypes } from 'prop-types';

const Visio = (props) => {
    console.log(props)

    //||Object.keys(props.paths).length===0
    const MenuItems = props.modules===undefined?null:Object.keys(props.modules).map(key => {
        return  <li>
                    {/* <NavLink to={props.paths[key]}> */}
                    <__mainMenuItem 
                        sidebar={props.sidebars[key]}
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

{/* <li>
                <NavLink to='/visualization cameras'>
                <__mainMenuItem 
                    head={
                        {
                            text: "SAVA видеокамеры",
                        }
                    } 
                    body={
                        {
                            text: "Контроль камер DAHUA",
                            src: ""
                        }
                    }
                    to='/visualization cameras'/>
                </NavLink>
            </li>
            <li>  
                <NavLink to='/visualization acs devicesLogs'>
                <__mainMenuItem 
                        head={
                            {
                                text: "SAVA СКУД",
                            }
                        } 
                        body={
                            {
                                text: 'Контроль СКУД "Castle"',
                                src: ""
                            }
                        }
                        to='/visualization acs devicesLogs'/>
                </NavLink>
            </li>
            <li>
                <NavLink to='/visualization iss'>
                <__mainMenuItem 
                    head={
                        {
                            text: 'SAVA СЗИ', 
                        }
                    } 
                    body={
                        {
                            text: `Антивирусная аналитика
    Dr.Web
    Kaspersky`,
                            src: ""
                        }
                    }
                    to='/visualization iss'/>
                </NavLink>
            </li> */}