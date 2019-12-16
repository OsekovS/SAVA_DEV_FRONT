import React from 'react';
import __mainMenuItem from './MenuItem/MenuItem'
import __header from '../../Common/__header/__header'
import {NavLink} from 'react-router-dom'
import './Visio.scss';

const Visio = (props) => {
    return <div className="Visio">
        <__header text={"Визуализация"} clazz="Common__header Common__header_red"/>
        <ul>
            <li>
                <NavLink to='/visualization cameras'>
                <__mainMenuItem 
                    head={
                        {
                            text: "SAVA видеокамеры",
                            events: props.cameras_dahua.events,
                            errors: props.cameras_dahua.errors,
                            exceptions: props.cameras_dahua.exceptions
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
                <NavLink to='/visualization acs'>
                <__mainMenuItem 
                        head={
                            {
                                text: "SAVA СКУД",
                                events: props.acs_castle_ep2.events,
                                errors: props.acs_castle_ep2.errors,
                                exceptions: props.acs_castle_ep2.exceptions
                            }
                        } 
                        body={
                            {
                                text: 'Контроль СКУД "Castle"',
                                src: ""
                            }
                        }
                        to='/visualization acs'/>
                </NavLink>
            </li>
            <li>
                <NavLink to='/visualization iss'>
                <__mainMenuItem 
                    head={
                        {
                            text: 'SAVA СЗИ', 
                            events: props.iss.events,
                            errors: props.iss.errors,
                            exceptions: props.iss.exceptions
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
            </li>
        </ul>
    </div>
}

export default Visio;