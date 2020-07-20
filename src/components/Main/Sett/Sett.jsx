import React from 'react';
import './Sett.scss';
import __header from '../../Common/__header/__header'
import __mainMenuItem from './MenuItem/MenuItem'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux";
const Sett = (props) => {
    let moduleSettingsLink, sidebarValues = Object.values(props.sidebar)
    if(sidebarValues.length>0)
    sidebarValues.forEach(element => {
        if(element.active) moduleSettingsLink = element.to
    })
    else moduleSettingsLink = '/setting module acs'
    console.log(props.sidebar)
    console.log(moduleSettingsLink)
    return <div className="Sett">
    <__header text={"Настройки"} clazz="Common__header Common__header_red"/>
    <ul>
        {/* <li>
            <NavLink to={moduleSettingsLink}>
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
                        to={moduleSettingsLink}/>
            </NavLink>
        </li> */}
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
        <li>
            <NavLink to='/email alert'>
                <__mainMenuItem 
                        head={
                                {
                                    text: "E-mail оповещения",
                                }
                            } 
                        body={
                                {
                                    text: `Настройка списка адресов
и просмотр событий`,
                                }
                        }
                        to='/email alert'/>
            </NavLink>
        </li>
    </ul>
</div>
}

let mapStateToProps = (state) => {
    return {
      sidebar: state.modSidebar.settings
    }
  }
  let mapDispatchToProps = {
      // addDashBoardThunk
  }
  
  const SettCont = connect(mapStateToProps, mapDispatchToProps)(Sett);
  
export default SettCont;