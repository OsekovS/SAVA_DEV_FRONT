import React from 'react';
import './__modules.scss';
import Sidebar from '../../Sidebar/SidebarSettingsCont'
import {BrowserRouter, Route} from 'react-router-dom'
import SettingsTables from './SettingsTables/SettingsTables'

const __modules = (props) => {
    
    let Routes = [],  adressStr,
    {modules,settings,sidebar} = props, 
    Module
    // console.log(sidebar)
    // 
    for (const moduleKey in modules) {
        if (modules.hasOwnProperty(moduleKey)) {
            Module = modules[moduleKey]
            let forTables = {...Module.settings}
            delete forTables.sidebar
            let moduleSettings = settings[moduleKey]===undefined?{}:settings[moduleKey]
            if(Object.keys(sidebar).length>0&&sidebar[moduleKey].active) adressStr = Module.settings.sidebar.to
            Routes.push(
                <Route path={Module.settings.sidebar.to} render={()=><SettingsTables tables={forTables.Tabels}  dbName={moduleKey} content={moduleSettings}/>}></Route>
            )
        }
    }
    // console.log(Routes)
    // console.log(adressStr)
    return     <Route path={adressStr} render={()=><div className="Settings__modules">
                    <Sidebar dbName={props.dbName} sidebar={props.sidebar}  type= 'settings'></Sidebar>
                    <div className="Settings__infoHandler">
                        {Routes}
                    </div>     
                </div>}></Route>
                
                // <BrowserRouter>
                // </BrowserRouter>
}

export default __modules;