import React from 'react';
import './Sett.scss';
import __header from '../../Common/__header/__header'
import __mainMenuItem from './MenuItem/MenuItem'
import {NavLink} from 'react-router-dom'
const Sett = () => {
 
    return <div className="Sett">
    <__header text={"Настройки"} clazz="Common__header Common__header_red"/>
    <ul>
        <li>
            <NavLink to='/setting module acs'>
                <__mainMenuItem 
                        head={
                                {
                                    text: "Настройки модулей SAVA",
                                }
                            } 
                        body={
                                {
                                    text: "Настройки подключенных модулей",
                                }
                        }
                        to='/setting module acs'/>
            </NavLink>
        </li>
        <li>  
            <NavLink to='/setting users'>
                <__mainMenuItem 
                        head={
                                {
                                    text: "Управление пользователями",
                                }
                            } 
                        body={
                                {
                                    text: `Добавление, редактирование и
    удаление пользователей`,
                                }
                        }
                        to='/setting users'
                        />
            </NavLink>
        </li>
        <li>
            <NavLink to='/setting common'>
                <__mainMenuItem 
                        head={
                                {
                                    text: "Сетевые настройки",
                                }
                            } 
                        body={
                                {
                                    text: "Общие настройки сети",
                                }
                        }
                        to='/setting common'/>
            </NavLink>
        </li>
        <li>
            <NavLink to='/setting lic'>
                <__mainMenuItem 
                        head={
                                {
                                    text: "Лицензия",
                                }
                            } 
                        body={
                                {
                                    text: "Добавление файла лицензии",
                                }
                        }
                        to='/setting lic'/>
            </NavLink>
        </li>
    </ul>
</div>
}




export default Sett;