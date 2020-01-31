import * as axios from 'axios'
import {setCookie,getCookie} from '../JS/Cookies'
import moment from "moment"
const UPDATE_PAGE = "UPDATE_PAGE"
const LOG_IN = "LOG_IN"
const LOG_OUT = "LOG_OUT"
const UPDATE_PANEL_LOGS_COUNT = 'UPDATE_PANEL_LOGS_COUNT'
const UPLOAD_LAST_TIME = 'UPLOAD_LAST_TIME'

let initialState = {
    isAuth: false,
    briefUserInfo: {name: 'administrator',
    admin: 'администратор'}
};

const authReducer = (state = initialState, action) => {
   let stateCopy = state
    switch (action.type) {
       case LOG_IN:
            
            stateCopy = {...state}
            stateCopy.isAuth = true
            stateCopy.briefUserInfo.name = action.data.login
            stateCopy.briefUserInfo.admin = action.data.admin === "yes" ? 'администратор' : 'оператор'
            stateCopy.briefUserInfo.modules = action.data.modules//JSON.parse(action.data.modules)
            // for (const key in action.data) {
            //     if (action.data.hasOwnProperty(key)) {
            //         setCookie(key,action.data[key])
            //     }
            // }
            setCookie("admin",action.data.admin)
            setCookie("hash",action.data.hash)
            setCookie("login",action.data.login)
            setCookie("modules",JSON.stringify(action.data.modules))
           return stateCopy;
        case UPDATE_PAGE:

            stateCopy = {...state}
            stateCopy.isAuth = true
            stateCopy.briefUserInfo.name = getCookie('login')
            stateCopy.briefUserInfo.admin = getCookie('admin') === "yes" ? 'администратор' : 'оператор'
            stateCopy.briefUserInfo.modules = action.modules//JSON.parse(getCookie('modules'))
            // console.log(action.modules)
            return stateCopy;
        case LOG_OUT:
            stateCopy = {...state}
            stateCopy.isAuth = false
            setCookie("admin","")
            setCookie("hash","")
            setCookie("login","")
            setCookie("modules","")
            return stateCopy;
        case UPDATE_PANEL_LOGS_COUNT:
            stateCopy = {...state}
            stateCopy.briefUserInfo = {...state.briefUserInfo}
            stateCopy.briefUserInfo.modules = {...state.briefUserInfo.modules}

            // action.data = {
            //     acs_castle_ep2:{
            //         acs_castle_ep2_event: [1,2,3],
            //         acs_castle_ep2_userlog: [4,5,6]
            //     }
            // }         
            // console.log(action.data)
            for (const key in action.data) {
                if (action.data.hasOwnProperty(key)) {
                    stateCopy.briefUserInfo.modules[key] = {...state.briefUserInfo.modules[key]}
                    stateCopy.briefUserInfo.modules[key].mode = 'lastViewed'
                    stateCopy.briefUserInfo.modules[key].indexes = {...state.briefUserInfo.modules[key].indexes}
                    for (const index in action.data[key]) {
                        stateCopy.briefUserInfo.modules[key].indexes[index].logsCount={}
                        if (action.data[key].hasOwnProperty(index)) {
                            //цикл по всем типам событий по порядку
                            stateCopy.briefUserInfo.modules[key].indexes[index].logsCount = action.data[key][index]
                            // console.log( stateCopy.briefUserInfo.modules[key].indexes[index].events)//тут назв индексов нужно распихать
                            //цикл по названиям событий внутри конткретного индекса (для сохранения порядка следования)
                            // stateCopy.briefUserInfo.modules[key].indexes[index].events.forEach((event,num) => {
                            //     stateCopy.briefUserInfo.modules[key].indexes[index].logsCount = action.data[key][index]
                            // });
                            // stateCopy.briefUserInfo.modules[key].indexes[index].eventsObject = action.data[key][index].logsCount[action.data[key][index].events[i]]
                            
                        }
                    }
                    // console.log(stateCopy)
                }
            }
            return stateCopy
        case UPLOAD_LAST_TIME:
            let {dbName, indexName, newTime} = action
            stateCopy = {...state}
            stateCopy.briefUserInfo = {...state.briefUserInfo}
            stateCopy.briefUserInfo.modules = {...state.briefUserInfo.modules}
            stateCopy.briefUserInfo.modules[dbName] = {...state.briefUserInfo.modules[dbName]}
            stateCopy.briefUserInfo.modules[dbName].indexes = {...state.briefUserInfo.modules[dbName].indexes}
            stateCopy.briefUserInfo.modules[dbName].indexes[indexName] = {...state.briefUserInfo.modules[dbName].indexes[indexName]}
            stateCopy.briefUserInfo.modules[dbName].indexes[indexName].lastViewed = newTime
            return stateCopy
       default:
           return state;
   }
}

export const uploadLastTime = (indexName,dbName,newTime) => ({type: UPLOAD_LAST_TIME, indexName,dbName,newTime})

// export const delUser = (id) => ({type: DEL_USER, id: id })
const logIn = (data) => ({type: LOG_IN,data})
export const logOut = () => ({type: LOG_OUT})

const updatePage = (modules) => ({type: UPDATE_PAGE,modules})

const updatePageLogsCount = (data) => ({type: UPDATE_PANEL_LOGS_COUNT,data})

export const getLogsCountThumk = () =>{
    return (dispatch,getState) => {
        let state = getState().auth.briefUserInfo
        console.log(state)
        axios.post("php/acs-form-processor.php",{need:"modulesInfo",login:state.name,modules:state.modules}).then(response => {
            
            // console.log(response.request)
            let json = JSON.parse(response.request.response);
            // console.log(json)
            return dispatch(updatePageLogsCount(json))
            // dispatch(updatePage())
        
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}

export const onChangeUserSawThunk = (indexName,id,dbName) => {
    // console.log(moment(new Date()).format('YYYY/MM/DD HH:mm:ss'))
    return (dispatch,getState) => {
        const newTime = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
        const briefUserInfo = getState().auth.briefUserInfo
        const ReqObj ={
            need: 'changeTimeMark',
            id,indexName,
            time: newTime,
            login: briefUserInfo.name 
        }
        axios.post("php/acs-form-processor.php",ReqObj).then(response => {
            // console.log(response)
            let json = JSON.parse(response.request.response);
            // console.log(json)
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
        dispatch(uploadLastTime(indexName,dbName,newTime))
        }
    }

export const logInThunk = (logObj) => {
    return (dispatch) => {
        // console.log(logObj)
        
        axios.post("php/users-form-processor.php",{"auth":logObj}).then(response => {
            // console.log(response.request)
            let json = JSON.parse(response.request.response);
            // console.log(json)
            if(json.result)
            dispatch(logIn(json.cookies));
            else alert('Ошибка авторизации, неверно введен пароль или логин')
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}


export const checkCookies = () => {
    return (dispatch,getState) => {
        const briefUserInfo = getState().auth.briefUserInfo
        console.log(briefUserInfo)
        // let indexes = getState().auth.briefUserInfo.modules.indexes
        axios.post("php/users-form-processor.php",{"upload":{
            login: getCookie("login"),
            hash: getCookie("hash"),//,aggs:true,aggsParam: 'significance'
            modules: getCookie("modules"),
            
        }}).then(response => {
            
            // console.log(response.request)
            let json = JSON.parse(response.request.response);
            // console.log(json)
            if(json.result){
                dispatch(updatePage(json.modules))
            }
            // dispatch(updatePage())
        
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}


export default authReducer;