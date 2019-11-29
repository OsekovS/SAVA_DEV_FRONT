import {createStore, combineReducers} from 'redux'
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


let reducers = combineReducers({
    headerInfo: headerReducer,
    navBar: navBarReducer,
    allEvents: allEventsReducer,
    cameras: camerasReducer,
    acs: acsReducer,
    iss: issReducer,
    users: usersReducer,
    net: netSettingsReducer,
    notific: notificSettingsReducer,
    timezone: timezoneSettingsReducer,
    lic: licReducer,
    form: formReducer
})
let store = createStore(reducers);

export default store;