import {applyMiddleware,createStore, combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'
import {headerReducer} from './header-reducer'
import navBarReducer from './nav-bar-reducer'
import allEventsReducer from './all-events-reducer'
import camerasReducer from './cameras-reducer'
// import issReducer from './iss-reducer'
import acsLogsReducer from './acs-dashboards-reducer'
import acsSettingsReducer from './acs-settings-reducer'
import usersReducer from './users-reducer'
import netSettingsReducer from './net-settings-reducer'
import licReducer from './lic-reducer'
import notificSettingsReducer from './notific-settings-reducer'
import timezoneSettingsReducer from './timezone-settings-reducer'
import modSidebarReducer from './mod-sidebar-reducer'
import authReducer from './auth-reducer'
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    notific: notificSettingsReducer,
    net: netSettingsReducer,
    timezone: timezoneSettingsReducer,
    users: usersReducer,
    auth: authReducer,
    dashboards: acsLogsReducer,
    // cameras: camerasReducer,
    acs: combineReducers({
        dashboards: acsLogsReducer,
        settings: acsSettingsReducer
    }),
    iss: combineReducers({
        dashboards: acsLogsReducer,
        settings: acsSettingsReducer
    }),
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