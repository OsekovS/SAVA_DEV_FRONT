import * as axios from 'axios'
import {setCookie,getCookie} from '../JS/Cookies'
// console.log((getCookie("aui")))
let getInitialState = () =>{
    // ntp_servers: ['1','2','3']
    if(getCookie("ntp_settings"))  return {
        ntp_servers: JSON.parse(getCookie("ntp_settings"))
    }
    else return {
        ntp_servers: {
            'NTP server 1:': '1',
            'NTP server 2:': '2',
            'NTP server 3:': '3'
        }
    }
    
};

const timezoneSettingsReducer = (state = getInitialState(), action) => {
    let stateCopy
    switch (action.type) {
        case 'UPDATE_TIMEZONE_SETTINGS':
                // console.log(action.ntp_servers)
                stateCopy= {...state}
                stateCopy.ntp_servers = action.ntp_servers
                setCookie("ntp_settings",JSON.stringify(stateCopy.ntp_servers))
            return stateCopy;
        case 'DEL_TIMEZONE_SETTINGS_FIELD':
                stateCopy= {...state}
                stateCopy.ntp_servers = {}
                let n = 1
                let j = 1
                for (const key in state.ntp_servers) {
                    if (state.ntp_servers.hasOwnProperty(key)) {
                        if(key !== action.key) {
                            
                            stateCopy.ntp_servers['NTP server '+n+':'] = state.ntp_servers['NTP server '+j+':']
                            n++;
                        }
                        j++
                    }
                }
                setCookie("ntp_settings",JSON.stringify(stateCopy.ntp_servers))
            return stateCopy;
        case 'ADD_TIMEZONE_SETTINGS_FIELD':
                stateCopy = {...state}
                stateCopy.ntp_servers = {...state.ntp_servers}
                stateCopy.ntp_servers['NTP server '+(Object.keys(state.ntp_servers).length+1)+':'] = ''
                setCookie("ntp_settings",JSON.stringify(stateCopy.ntp_servers))
                // stateCopy.ntp_servers.push('Введите новое значение')
            return stateCopy;
        default:
            return state;
    }
}

export const updateTimezoneActionCreator = ( ntp_servers) => {
    return {
    type: 'UPDATE_TIMEZONE_SETTINGS', 
    ntp_servers: ntp_servers
    }

}

export const addTimezoneActionCreator = ( ) => {
    return { type: 'ADD_TIMEZONE_SETTINGS_FIELD' }

}

export const delTimezoneActionCreator = ( key) => {
    return { type: 'DEL_TIMEZONE_SETTINGS_FIELD', key }

}

export const updateTimezoneActionThunk = (reqObj) => {
    return (dispatch,getState) => {
        let state = getState().timezone.ntp_servers
        let sendedObj = {...state}
        for (const key in reqObj) {
            if (reqObj.hasOwnProperty(key)) {
                sendedObj[key] = reqObj[key];
                
            }
        }
        axios.post("php/settings_admin.php",{ntp: Object.values(sendedObj)}).then(response => {
            
            // console.log(response.request)
            // let json = JSON.parse(response.request.response);
            // console.log(json)
            return dispatch(updateTimezoneActionCreator(sendedObj))
        
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}


export default timezoneSettingsReducer;