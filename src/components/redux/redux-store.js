import {applyMiddleware,createStore, combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import {headerReducer} from './header-reducer'
import navBarReducer from './nav-bar-reducer'
import allEventsReducer from './all-events-reducer'
import camerasReducer from './cameras-reducer'
import issReducer from './iss-reducer'
import acsReducer from './acs-reducer'
import usersReducer from './users-reducer'
import netSettingsReducer from './net-settings-reducer'
import licReducer from './lic-reducer'
import notificSettingsReducer from './notific-settings-reducer'
import timezoneSettingsReducer from './timezone-settings-reducer'
import modSidebarReducer from './mod-sidebar-reducer'
import thunkMiddleware from "redux-thunk";
let reducers = combineReducers({
    notific: notificSettingsReducer,
    net: netSettingsReducer,
    timezone: timezoneSettingsReducer,
    users: usersReducer,

    cameras: camerasReducer,
    acs: acsReducer,
    iss: issReducer,

    headerInfo: headerReducer,
    navBar: navBarReducer,
    allEvents: allEventsReducer,
    lic: licReducer,
    form: formReducer,
    modSidebar: modSidebarReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store=store
export default store;