import * as axios from 'axios'
import {getCookie} from '../JS/Cookies'

const UPDATE_SETTINGS = 'UPDATE_NOTIFIC_SETTINGS';

let initialState = {
    events:[],
    addresses:[]
};

const notificSettingsReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
    case 'UPDATE_NOTIF_EVENTS':
        stateCopy = {...state}
        // console.log(Array.isArray(action.addresses))
        stateCopy.events = (Array.isArray(action.events))?action.events:[];
        // if(Array.isArray(stateCopy.events))
        stateCopy.events.sort(function(a, b) {
            return a.id - b.id;
          });
        return stateCopy;
    case 'UPDATE_NOTIF_ADRESSES':
        stateCopy = {...state}
        stateCopy.addresses = (Array.isArray(action.addresses))?action.addresses:[]; 
        // if(Array.isArray(stateCopy.addresses))
        stateCopy.addresses.sort(function(a, b) {
            return a.id - b.id;
          });
        return stateCopy;
    case 'UPDATE_NOTIF_EVENTS_FILTER':
        stateCopy = {...state}
        stateCopy.events = [...state.events];
        stateCopy.events[action.id].filter = action.filter
        return stateCopy;
    case 'ADD_NOTIF_EVENT':
     
        stateCopy = {...state}
        stateCopy.events = state.events?[...state.events]:[];
        stateCopy.events.push(action.event)
        stateCopy.events.sort(function(a, b) {
            return a.id - b.id;
          });
        return stateCopy;   
    case 'ADD_NOTIF_ADRESS':
        stateCopy = {...state}
        console.log(action.adress)
        const {login, name, theme,events} = action.adress
        id = action.adress.id
        stateCopy.addresses = state.addresses?[...state.addresses]:[];
        stateCopy.addresses.push({
            events: JSON.stringify(events),
            id,login, name, theme,
        })
        stateCopy.addresses.sort(function(a, b) {
            return a.id - b.id;
          });
        return stateCopy;   
    case 'DELL_NOTIF_EVENT':
        stateCopy = {...state}
        console.log(action.id)
        stateCopy.events = state.events.filter(element => {
            console.log(element)
            return element.id !== action.id
        });
        return stateCopy;   
    case 'DELL_NOTIF_ADRESS':
        stateCopy = {...state}
        console.log(action.id)
        stateCopy.addresses = state.addresses.filter(element => {
            console.log(element)
            return element.id !== action.id
        });
        return stateCopy;
    case 'UPDATE_SMTP':
        stateCopy = {...state}
        stateCopy.smtp = action.smtp
        
        return stateCopy
    case 'CHANGE_SMTP':
        console.log(action.smtp)
        stateCopy = {...state}
        stateCopy.smtp = action.smtp
        stateCopy.smtp.useauth = action.smtp.useAuth?'t':'f'
        return stateCopy
    case 'CHANGE_NOTIF_ADRESS':
        stateCopy = {...state}
        let {id, eventsList, newTheme} = action
        stateCopy.addresses = state.addresses.map(element => {
            if(element.id===id){
                element.events = eventsList
                element.theme = newTheme
            }
            return element
        });
        return stateCopy;
    case     'CHANGE_NOTIF_ADRESSES':
        console.log(state.addresses)
        console.log(action.id)
        stateCopy= {...state}
        stateCopy.addresses = state.addresses.map((elem)=>{
            const events = JSON.parse(elem.events)
            const old = events.indexOf(action.id)
            if(old!==-1&&elem.events.length>0){
                const copy = {...elem}
                copy.events = JSON.stringify([].concat(events.slice(0,old),events.slice(old+1)))
                return copy
            }
            else return elem
        })
        console.log(stateCopy.addresses)
        return stateCopy;
    default:
        return state;
   }
}
const changeAdresses =  (id) =>{
    return ({ type: 'CHANGE_NOTIF_ADRESSES', id })}
const updateEvents= (events) =>{
    return ({ type: 'UPDATE_NOTIF_EVENTS', events })}

const updateAdresses= (addresses) =>{
    return ({ type: 'UPDATE_NOTIF_ADRESSES', addresses })}

const updateEventsFilter = (id, filter) =>{
    return ({ type: 'UPDATE_NOTIF_EVENTS_FILTER', id, filter })}

const addEvent = (event) =>{
    return ({ type: 'ADD_NOTIF_EVENT', event })}

const addAdress = (adress) =>{
    return ({ type: 'ADD_NOTIF_ADRESS', adress })}

const updateSmtp = (smtp) =>{
    return ({ type: 'UPDATE_SMTP', smtp })}
    
    
const dellEvent = (id) =>{
    return ({ type: 'DELL_NOTIF_EVENT', id })}

const dellAdress = (id) =>{
    return ({ type: 'DELL_NOTIF_ADRESS', id })}

const changeSmtpSet = (smtp) =>{
    return ({ type: 'CHANGE_SMTP', smtp })}

const changeAdress= (id, eventsList, newTheme) =>{
    return ({ type: 'CHANGE_NOTIF_ADRESS', id, eventsList, newTheme})}
// export const onAddEventThunk = () => {
//     return (dispatch,getState) => {
//     }
// }

export const getEvensAndAdressesThunk = () => {
    return (dispatch,getState) => {
        // console.log(reqObj)
        // return dispatch({type: ''})
        axios.post("php/settings_admin.php",{need: 'notific'}).then(response => {
            
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            // reqObj
            dispatch(updateSmtp(json.smtp))
            dispatch(updateEvents(json.events))
            dispatch(updateAdresses(json.addresses))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const onAddEventThunk = (event) => {
    
    let socketJSON = {
        "operation":"MAIL update",
        "params": {
          "db":"emailnotificationevents"
        }
      }
    console.log(event)
    return (dispatch,getState) => {
        axios.post("php/settings_admin.php",{notific:{purpose:'addEvent', event, socketJSON}}).then(response => {
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            event.login=getCookie("login")
            dispatch(addEvent(event))
            // dispatch(updateEventsFilter(id, JSON.stringify(filter)))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const onAddAdressThunk = (adress) => {
    adress.login=getCookie("login")
    let socketJSON = {
        "operation":"MAIL update",
        "params": {
          "db":"emailaddressees"
        }
      }
      
    return (dispatch,getState) => {
        axios.post("php/settings_admin.php",{notific:{purpose:'addAdress', adress, socketJSON}}).then(response => {
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result===false)
            return dispatch(addAdress(adress))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const onDellEventThunk = (id) => {
    return (dispatch,getState) => {
        // console.log(args)
        // return dispatch({type: ''})

        axios.post("php/settings_admin.php",{notific:{purpose:'dellEvent',id}}).then(response => {
            
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result===false){
                dispatch(dellEvent(id))
                dispatch(changeAdresses(id))
            }
            
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const onDellAdressThunk = (id) => {
    return (dispatch,getState) => {
        // console.log(args)
        // return dispatch({type: ''})

        axios.post("php/settings_admin.php",{notific:{purpose:'dellAdress',id}}).then(response => {
            
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result===false)
            dispatch(dellAdress(id))
            // dispatch(dellAdress(id))
            // if(json.result===false)
            // dispatch(dellEvent(id))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const onChangeEventFilterThunk = (id,login,filter) => {
    return (dispatch,getState) => {
        // console.log(args)
        // return dispatch({type: ''})

        axios.post("php/settings_admin.php",{notific:{purpose:'changeFilter',id,login,filter: JSON.stringify(filter)}}).then(response => {
            
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(updateEventsFilter(id, JSON.stringify(filter)))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const onEditAdressEventsThunk = (id, eventsList, newTheme) => {
    return (dispatch,getState) => {
        // console.log(getState().notific.addresses)
        if(newTheme===undefined)getState().notific.addresses.forEach((e)=>{
            if(e.id===id) newTheme=e.theme
        })
        // return dispatch({type: ''})

        axios.post("php/settings_admin.php",{
            notific:{
                purpose:'changeAdress',
                id,
                eventsList,
                newTheme
            }}).then(response => {
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            return dispatch(changeAdress(id, eventsList, newTheme))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const smtpSettigsThunkThunk = (event) => {
    
    console.log(event)
    return (dispatch,getState) => {
        dispatch({type:''})
        axios.post("php/settings_admin.php",{notific:{purpose:'setSMTP', event}}).then(response => {
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result!==null){
                alert('настройки успешно применены')
                dispatch(changeSmtpSet(event))
            }else {
                alert('ошибка при изменении настроек')
            }
            

            

            // event.login=getCookie("login")
            // dispatch(addEvent(event))
            // dispatch(updateEventsFilter(id, JSON.stringify(filter)))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export const smtpTestThunk = (adress) => {
    return (dispatch,getState) => {
        //dispatch({type:''})
        let data = JSON.stringify({
            "operation":"MAIL test",
            "params": {
                "addressee":adress
            }
        })
        axios.post("php/settings_admin.php",{notific:{purpose:'testSMTP', data}}).then(response => {
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            alert(json.result!==null?json.python:'ошибка')
            // dispatch(updateSmtp(event))

            // event.login=getCookie("login")
            // dispatch(addEvent(event))
            // dispatch(updateEventsFilter(id, JSON.stringify(filter)))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}

export default notificSettingsReducer;