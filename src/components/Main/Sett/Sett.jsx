import React from 'react';
// import s from './Header.module.css';
import './Sett.scss';
import __header from '../../Common/__header/__header'
// import __MenuItem from './__menuItem/__MenuItem'
import __mainMenuItem from './MenuItem/MenuItem'
import {NavLink} from 'react-router-dom'
const Sett = () => {
    return <div className="Sett">
    <__header text={"Настройки"} clazz="Common__header Common__header_red"/>
    <ul>
        <li>
            <NavLink to='/settings/modules/acs'>
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
                        }/>
            </NavLink>
        </li>
        <li>  
            <NavLink to='/settings/users'>
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
                        }/>
            </NavLink>
        </li>
        <li>
            <NavLink to='/settings/common'>
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
                        }/>
            </NavLink>
        </li>
        <li>
            <NavLink to='/settings/lic'>
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
                        }/>
            </NavLink>
        </li>
    </ul>
</div>
}
export default Sett;