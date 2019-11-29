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
                <NavLink to='/visualization/cameras'>
                <__mainMenuItem 
                    head={
                        {
                            text: "SAVA видеокамеры",
                            events: props.cameras.events,
                            errors: props.cameras.errors,
                            exceptions: props.cameras.exceptions
                        }
                    } 
                    body={
                        {
                            text: "Контроль камер DAHUA",
                            src: ""
                        }
                    }/>
                </NavLink>
            </li>
            <li>  
                <NavLink to='/visualization/acss'>
                <__mainMenuItem 
                        head={
                            {
                                text: "SAVA СКУД",
                                events: props.acs.events,
                                errors: props.acs.errors,
                                exceptions: props.acs.exceptions
                            }
                        } 
                        body={
                            {
                                text: 'Контроль СКУД "Castle"',
                                src: ""
                            }
                        }/>
                </NavLink>
            </li>
            <li>
                <NavLink to='/visualization/iss'>
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
                    }/>
                </NavLink>
            </li>
        </ul>
    </div>
}

export default Visio;