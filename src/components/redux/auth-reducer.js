import * as axios from 'axios'
import {setCookie,getCookie} from '../JS/Cookies'
import moment from "moment"
import {afterLicUpdate} from './lic-reducer'
import {updateNetActionCreator} from './net-settings-reducer'
import {updateTimezoneActionCreator} from './timezone-settings-reducer'
import {updatePaths} from './paths-reducer'

const UPDATE_PAGE = "UPDATE_PAGE"
const LOG_IN = "LOG_IN"
const LOG_OUT = "LOG_OUT"
const UPDATE_PANEL_LOGS_COUNT = 'UPDATE_PANEL_LOGS_COUNT'
const CHANGE_LAST_VIEWED = 'CHANGE_LAST_VIEWED'

let initialState = {
    isAuth: null,
    briefUserInfo: {name: 'administrator',
    admin: 'администратор'}
};

const authReducer = (state = initialState, action) => {
   let stateCopy = state
    switch (action.type) {
       case LOG_IN:
            let modules = action.data.modules
            let indexes = {}
            stateCopy = {...state}
            stateCopy.isAuth = true
            stateCopy.briefUserInfo.name = action.data.login
            stateCopy.briefUserInfo.admin = action.data.admin === "yes" ? 'администратор' : 'оператор'
            stateCopy.briefUserInfo.modules = modules//JSON.parse(action.data.modules)
            stateCopy.modulesTranslate = {
                indexes: {}
            }
            for (const moduleKey in modules) {
                if (modules.hasOwnProperty(moduleKey)) {
                    indexes[moduleKey] = Object.keys(modules[moduleKey]['indexes'])
                    stateCopy.modulesTranslate[moduleKey] = modules[moduleKey].title
                    
                    for (const indexKey in modules[moduleKey].indexes) {
                        if (modules[moduleKey].indexes.hasOwnProperty(indexKey)) {
                            stateCopy.modulesTranslate.indexes[indexKey] = modules[moduleKey].indexes[indexKey].title
                        }
                    }
                }
            }
            // console.log(indexes)
            setCookie('modulesTranslate',JSON.stringify(stateCopy.modulesTranslate))
            setCookie('modules',JSON.stringify(indexes))
            // console.log(getCookie('modules'))
            setCookie("admin",action.data.admin)
            setCookie("hash",action.data.hash)
            setCookie("lic",JSON.stringify(action.data.lic))
            setCookie("login",action.data.login)
            setCookie("net_settings",JSON.stringify(action.data.net_settings))
            setCookie("ntp_settings",JSON.stringify(action.data.ntp_settings))
            // setCookie("modules",JSON.stringify(action.data.modules.acs_castle_ep2))
           return stateCopy;
        case UPDATE_PAGE:
            stateCopy = {...state}
            stateCopy.isAuth = true
            stateCopy.briefUserInfo.name = getCookie('login')
            stateCopy.briefUserInfo.admin = getCookie('admin') === "yes" ? 'администратор' : 'оператор'
            stateCopy.briefUserInfo.modules = action.modules//JSON.parse(getCookie('modules'))
            stateCopy.modulesTranslate = JSON.parse(getCookie('modulesTranslate'))
            return stateCopy;
        case LOG_OUT:
            stateCopy = {...state}
            stateCopy.isAuth = false
            stateCopy.briefUserInfo.name = '';
            stateCopy.briefUserInfo.admin = ''
            setCookie("admin","")
            setCookie("hash","")
            setCookie("login","")
            setCookie("lic","")
            setCookie("net_settings","")
            setCookie("ntp_settings","")
            
            // setCookie("modules","")
            return stateCopy;
        case UPDATE_PANEL_LOGS_COUNT:
            stateCopy = {...state}
            stateCopy.briefUserInfo = {...state.briefUserInfo}
            stateCopy.briefUserInfo.modules = {...state.briefUserInfo.modules}
            // console.log(state)
            // console.log(action)
            for (const key in action.data) {
                if (action.data.hasOwnProperty(key)) {
                    stateCopy.briefUserInfo.modules[key] = {...state.briefUserInfo.modules[key]}
                    stateCopy.briefUserInfo.modules[key].mode = 'lastViewed'
                    stateCopy.briefUserInfo.modules[key].indexes = {...state.briefUserInfo.modules[key].indexes}
                    stateCopy.briefUserInfo.modules[key].loaded=true
                    for (const index in action.data[key]) {
                        stateCopy.briefUserInfo.modules[key].indexes[index].logsCount={}
                        if (action.data[key].hasOwnProperty(index)) {
                            
                            let list = Object.keys(action.data[key][index])
                            // console.log(list)
                            list.sort(compareLastIndexLook.bind(this,action.data[key][index]))
                            // console.log(list)
                            // list.forEach(key => {
                            //     const event = indexes[index].logsCount[key]
                            //     eventsCount.push(<p onClick={()=>this.props.changeFilterByClickOnMenuItemThunk({significance: [event.key]},index,dbName)}>{event.key}: <span  className={'label'+'_'+event.style}>{event.doc_count>999?'999+':event.doc_count}</span></p>) 
                            // });
                            
                            stateCopy.briefUserInfo.modules[key].indexes[index].logsCount = action.data[key][index]
                        }
                    }
                    // console.log(stateCopy)
                }
            }
            return stateCopy
            case 'CHANGE_LAST_VIEW':{
                console.log(action)
                stateCopy = {...state}
                stateCopy.briefUserInfo = {...state.briefUserInfo}
                stateCopy.briefUserInfo.modules = {...state.briefUserInfo.modules}
                stateCopy.briefUserInfo.modules[action.dbName] = {...state.briefUserInfo.modules[action.dbName]}
                stateCopy.briefUserInfo.modules[action.dbName].indexes = {...state.briefUserInfo.modules[action.dbName].indexes}
                stateCopy.briefUserInfo.modules[action.dbName].indexes[action.indexName] = {...state.briefUserInfo.modules[action.dbName].indexes[action.indexName]}
                stateCopy.briefUserInfo.modules[action.dbName].indexes[action.indexName].lastViewed = {fromNum:action.fromNum, fromLetter:action.fromLetter}
                return stateCopy;
            }
            case 'UPLOAD_EDITED_LIST':{
                console.log(action)
                let {dbName, indexName, newTime,editedList} = action
                stateCopy = {...state}
                stateCopy.briefUserInfo = {...state.briefUserInfo}
                stateCopy.briefUserInfo.modules = {...state.briefUserInfo.modules}
                stateCopy.briefUserInfo.modules[dbName] = {...state.briefUserInfo.modules[dbName]}
                stateCopy.briefUserInfo.modules[dbName].indexes = {...state.briefUserInfo.modules[dbName].indexes}
                stateCopy.briefUserInfo.modules[dbName].indexes[indexName] = {...state.briefUserInfo.modules[dbName].indexes[indexName]}
                stateCopy.briefUserInfo.modules[dbName].indexes[indexName].logsCount = {...state.briefUserInfo.modules[dbName].indexes[indexName].logsCount}
                editedList.forEach((e)=>{
                    stateCopy.briefUserInfo.modules[dbName].indexes[indexName].logsCount[e].lastTime = newTime
                    stateCopy.briefUserInfo.modules[dbName].indexes[indexName].logsCount[e].doc_count = 0

                })
        
                return stateCopy
            }
            case 'UPLOAD_DISK_INFO':{
                console.log(action)
                stateCopy = {...state}
                stateCopy.briefUserInfo = {...state.briefUserInfo}
                let modules = stateCopy.briefUserInfo.modules
                stateCopy.briefUserInfo.diskInfo = action.diskInfo.filter((elem)=>{
                    let result = false
                    for (const moduleKey in modules) {
                        for (const indexKey in modules[moduleKey].indexes) {
                            if (modules.hasOwnProperty(moduleKey) && modules[moduleKey].indexes.hasOwnProperty(indexKey)
                                && indexKey === elem['Название таблицы elasticsearch']) {
                                    result = true;
                            }
                        }   
                    }
                    return result
                })       
                stateCopy.briefUserInfo.diskAvail = action.diskAvail       
                return stateCopy
            }
       default:
           return state;
   }
}
export const setLastView = ({fromNum,fromLetter},indexName,dbName) => ({type: 'CHANGE_LAST_VIEW' ,fromNum,dbName,fromLetter,indexName})
// export const changelastViewed = (newLastViewed,dbName) => ({type: CHANGE_LAST_VIEWED, newLastViewed,dbName})
export const uploadLastEditedList = (indexName,dbName,newTime,editedList) => ({type: 'UPLOAD_EDITED_LIST', indexName,dbName,newTime,editedList})
export const updateDiskInfo = (diskInfo, diskAvail) => ({type: 'UPLOAD_DISK_INFO', diskInfo, diskAvail})
// export const delUser = (id) => ({type: DEL_USER, id: id })
const logIn = (data) => ({type: LOG_IN,data})
export const logOut = () => ({type: LOG_OUT})

const updatePage = (modules) => ({type: UPDATE_PAGE,modules})

const updatePageLogsCount = (data) => ({type: UPDATE_PANEL_LOGS_COUNT,data})
export const setLastViewThunk = (lastTime,indexName,dbName) =>{
    return (dispatch,getState) => {
    axios.post("php/acs-form-processor.php", 
    {need:'changeLastTime',lastTime:JSON.stringify(lastTime),login:getCookie("login"),dbName,indexName}).then(response => {
        let json = JSON.parse(response.request.response);
        console.log(json)
        return dispatch(setLastView(lastTime,indexName,dbName))
    }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });;
    }
}
export const getLogsCountThumk = () =>{
    return (dispatch,getState) => {
        let state = getState().auth.briefUserInfo
        // console.log(state)
        axios.post("php/acs-form-processor.php",{need:"modulesInfo",login:state.name,modules:state.modules}).then(response => {
            // console.log({need:"modulesInfo",login:state.name,modules:state.modules})
            // console.log(response.request.response)
            // dispatch({type: ''})
            let json = JSON.parse(response.request.response);
            // console.log(json)
            return dispatch(updatePageLogsCount(json));

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

export const onChangeUserSawThunk = (indexName,id,dbName,editedList) => {
    // console.log(moment(new Date()).format('YYYY/MM/DD HH:mm:ss'))
    console.log(dbName)
    return (dispatch,getState) => {
        const newTime = moment(new Date()).format('YYYY/MM/DD HH:mm:ss')
        const briefUserInfo = getState().auth.briefUserInfo
        const ReqObj ={
            need: 'changeTimeMark',
            id,indexName,dbName,
            time: newTime,
            login: briefUserInfo.name ,editedList
        }
        console.log(ReqObj)
        axios.post("php/acs-form-processor.php",ReqObj).then(response => {
            // console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result !== null) {
                dispatch(uploadLastEditedList(indexName,dbName,newTime,editedList))
                alert('Выбранные события успешно отмечены')
            }else {
                alert('Ошибка')
            }
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

        // dispatch(changelastViewed = (newLastViewed) => ({type: CHANGE_LAST_VIEWED, newLastViewed}))
        }
    }

export const logInThunk = (logObj) => {
    return (dispatch) => {
        axios.post("php/users-form-processor.php",{"auth":logObj}).then(response => {
            // console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result){
                dispatch(afterLicUpdate(json.cookies.lic))
                dispatch(logIn(json.cookies));
                dispatch(updatePaths(json.cookies.modules));
                dispatch(updateNetActionCreator(json.cookies.net_settings))
                dispatch(updateTimezoneActionCreator(json.cookies.ntp_settings))
                dispatch(updateDiskInfo(json.diskInfo, json.dataAvail[0]));
            }
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
        console.log(getCookie('modules'))
        // let indexes = getState().auth.briefUserInfo.modules.indexes
        axios.post("php/users-form-processor.php",{"upload":{
            login: getCookie("login"),
            hash: getCookie("hash"),
            modules: (getCookie('modules'))//,aggs:true,aggsParam: 'significance'
            // modules: getCookie("modules"),
            
        }}).then(response => {
            
            //console.log(response.request.response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result){
                dispatch(updateNetActionCreator(JSON.parse(getCookie("net_settings"))))
                dispatch(afterLicUpdate(JSON.parse(getCookie("lic"))))
                dispatch(updatePage(json.modules))
                dispatch(updatePaths(json.modules));
                dispatch(updateDiskInfo(json.diskInfo, json.dataAvail[0]));
            }else dispatch(logOut())//выходим в авторизацию
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
//  lic=%7B%22from%22%3A%2201-01-1970%2003%3A00%3A00%22%2C%22to%22%3A%2201-01-1970%2003%3A00%3A00%22%2C%22day_last%22%3A-18313.300011574%7D; login=admin1"
//вспомогательная функция для сортировки обновлений по логам

const objForComparingLastIndexLook= {
    'High': 3,
    'Middle': 2,
    'Low': 1
}
function compareLastIndexLook(confObj,a,b) {
    
    let compO = objForComparingLastIndexLook
    if (compO[confObj[a].style] > compO[confObj[b].style]) {
      return -1;
    }
    if (compO[confObj[a].style] < compO[confObj[b].style]) {
      return 1;
    }
    // a должно быть равным b
    return 0;
}

export default authReducer;