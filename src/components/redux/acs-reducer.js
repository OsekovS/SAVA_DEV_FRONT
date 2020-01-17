import * as axios from 'axios'
import moment from "moment"
import {acsIni} from './IniStates.js'

const DEL_ENDP = 'DEL_ACS_ENDP';
const DEL_OBJ = 'DEL_ACS_OBJ';
const ADD_ENDP = 'ADD_ACS_ENDP'
const ADD_OBJ = 'ADD_ACS_OBJ';
const CHANGE_MODE = 'CHANGE_ACS_MODE'
const UPLOAD_ACS = 'UPLOAD_ACS'
const CHANGE_TIME = 'CHANGE_TIME'
const CHANGE_UPLOAD = 'CHANGE_UPLOAD'
const CHANGE_PARAM_FILTER = 'CHANGE_PARAM_FILTER'
const CHANGE_UPLOAD_PARAMS = 'CHANGE_UPLOAD_PARAMS'
const CHANGE_PAGE = 'CHANGE_PAGE'
const CHANGE_SHOWED_LOGS = 'CHANGE_SHOWED_LOGS'
const CHANGE_SORT_PARAM = 'CHANGE_SORT_PARAM'
const CHANGE_CURRENT_LOG = 'CHANGE_CURRENT_LOG'
const UPLOAD_DASHBOARDS = 'UPLOAD_DASHBOARDS'

let initialState = acsIni()


let translator = {
    'addObj': {
        tb_name: 'objects',
        field_len: 1,
        uni_type: 'name',
        uni_type_usr: 'именем'
    },
    'addEndp': {
        tb_name: 'endpoints',
        field_len: 5,
        uni_type: 'ip',
        uni_type_usr: 'ip'
    }
}

const acsReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
       case UPLOAD_DASHBOARDS:
        //    console.log
        //    console.log(JSON.parse(action.json.dashboards[0][3]))
        //    console.log(JSON.parse(action.json.dashboards[1][3]))
        stateCopy = {...state};
        let now = new Date()
        stateCopy.dashboards = action.json.dashboards.map((dash) => {
        console.log(dash)
        let body = JSON.parse(dash[3])   
        let toDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
        let fromDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0))).subtract(body.timeFilter.from.number, body.timeFilter.from.type)
            
            body.timeFilter= {
                from: fromDate,
                to: toDate
            }
            
            return {
                id: dash[0],
                name: dash[1],
                type: dash[2],
                body: body,
                // logs: []
            }
        });
           return stateCopy
       case ADD_ENDP:
            if(action.obj_num === undefined) action.obj_num = 1;
            let new_endp = {
                id: state.settings.endpoints.length,
                object: state.settings.objects[action.obj_num-1].name,
                ip: action.ip, 
                name: action.name, 
                port: action.port,
                login: action.login              
            };      
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.endpoints = state.settings.endpoints.map((e) => e);
            stateCopy.settings.endpoints.push(new_endp);
            stateCopy.settings.mode = 'view'
            return stateCopy;
       case DEL_ENDP:
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.endpoints = state.settings.endpoints.filter(e => e.id!==action.id)
            return stateCopy
       case ADD_OBJ:
            stateCopy = {...state};
            stateCopy.settings = {...state.settings}
            stateCopy.settings.objects = [...state.settings.objects, 
                {id: action.id ,name: action.name}]
            stateCopy.settings.mode = 'view'
            return stateCopy;
       case DEL_OBJ:
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.objects = state.settings.objects.filter(e => e.id!==action.id)
            return stateCopy
        case CHANGE_MODE:
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.mode = action.mode
            return stateCopy
        case UPLOAD_ACS:
            stateCopy = {...state};
            if(action['need']==='settings'){
                stateCopy.settings.endpoints = action.json.endpoints.map( (e) => ({
                    id: e[0],
                    object: e[2], 
                    name: e[1],
                    port: e[3],
                    login: e[4]
                }))
                stateCopy.settings.objects = action.json.objects.map( (e) => ({
                    id: e[0], name: e[1]
                }))
            }
            else{
                // stateCopy.logs.logs = action.json.logs.map( (e) => e._source)
                // stateCopy.logs.pagination.total = action.json.total
                // stateCopy.logs.pagination.lastPage = Math.ceil(action.json.total/stateCopy.logs.pagination.showedLogs)
                stateCopy.dashboards = {...state.dashboards}
                stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
                stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
                stateCopy.dashboards[action.id].body.logs = action.json.logs.map( (e) => e._source)

                stateCopy.dashboards[action.id].body.LAGZ = action.json.logs.map( (e) => e._source)
                stateCopy.dashboards[action.id].body.pagination.total = action.json.total
                stateCopy.dashboards[action.id].body.pagination.lastPage = Math.ceil(action.json.total/stateCopy.logs.pagination.showedLogs)
            }
            // console.log(stateCopy)
                return stateCopy
        case CHANGE_TIME:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
  
            stateCopy.dashboards[action.id].body.timeFilter = {...state.dashboards[action.id].body.timeFilter}
            stateCopy.dashboards[action.id].body.timeFilter.from = (action.startDate)
            stateCopy.dashboards[action.id].body.timeFilter.to = (action.endDate)
            // stateCopy.logs = {...state.logs}
            // stateCopy.logs.timeFilter = {...state.logs.timeFilter}
            // stateCopy.logs.timeFilter.from = (action.startDate)
            // stateCopy.logs.timeFilter.to = (action.endDate)
            return stateCopy
        case CHANGE_PARAM_FILTER:

            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            let copyData = {...action.filter}
            console.log(copyData)
            if(copyData.devices!==undefined){
                copyData.device = []
                copyData.ip_device = []
            for (const device of copyData.devices) {
                copyData.device.push(
                device.split(' ')[0]
                )
                copyData.ip_device.push(
                device.split(' ')[1].slice(1,-1)
                )
            }
            delete copyData.devices
            }
            stateCopy.dashboards[action.id].body.paramFilter = copyData
            return stateCopy

            // stateCopy = {...state};
            // stateCopy.logs = {...state.logs}
            
            // let copyData = {...action.filter}
            // console.log(copyData)
            // if(copyData.devices!==undefined){
            //     copyData.device = []
            //     copyData.ip_device = []
            // for (const device of copyData.devices) {
            //     copyData.device.push(
            //     device.split(' ')[0]
            //     )
            //     copyData.ip_device.push(
            //     device.split(' ')[1].slice(1,-1)
            //     )
            // }
            // delete copyData.devices
            // }
            // stateCopy.logs.paramFilter = copyData
            // return stateCopy
        case CHANGE_UPLOAD:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.uploads = action.uploads
            // stateCopy = {...state}
            // stateCopy.logs = {...state.logs}
            // stateCopy.logs.uploads = {...state.logs.uploads}
            // stateCopy.logs.uploads.uploads = action.uploads
            return stateCopy
        case CHANGE_UPLOAD_PARAMS:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.uploads = {...state.dashboards[action.id].body.uploads}

            stateCopy.dashboards[action.id].body.uploads.timeNum = action.params.timeNum
            stateCopy.dashboards[action.id].body.uploads.timeKind = parseInt(action.params.timeKind)
            stateCopy.dashboards[action.id].body.uploads.from_number = action.params.from_number
            stateCopy.dashboards[action.id].body.uploads.from_time_type = action.params.from_time_type

            
            // stateCopy = {...state}
            // stateCopy.logs = {...state.logs}
            // stateCopy.logs.uploads = {...state.logs.uploads}
            // stateCopy.logs.uploads.timeNum = action.params.timeNum
            // stateCopy.logs.uploads.timeKind = parseInt(action.params.timeKind)
            // stateCopy.logs.uploads.from_number = action.params.from_number
            // stateCopy.logs.uploads.from_time_type = action.params.from_time_type
            return stateCopy
        case CHANGE_PAGE:
            console.log(action.page)
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.pagination = {...state.dashboards[action.id].body.pagination}
            if(action.page===1) stateCopy.dashboards[action.id].body.pagination.fromPage = 1
            else{
                if(action.page===state.dashboards[action.id].body.pagination.fromPage+state.dashboards[action.id].body.pagination.showedPages-1 && action.page !== state.dashboards[action.id].body.pagination.lastPage){
                    stateCopy.dashboards[action.id].body.pagination.fromPage = state.dashboards[action.id].body.pagination.fromPage + state.dashboards[action.id].body.pagination.showedPages - 2
                }else if(action.page===state.dashboards[action.id].body.pagination.lastPage){
                    if(Math.ceil(state.dashboards[action.id].body.pagination.total/state.dashboards[action.id].body.pagination.showedLogs)<state.dashboards[action.id].body.pagination.showedPages)
                        stateCopy.dashboards[action.id].body.pagination.fromPage = state.dashboards[action.id].body.pagination.lastPage - Math.ceil(state.dashboards[action.id].body.pagination.total/state.dashboards[action.id].body.pagination.showedLogs) + 1
                    else stateCopy.dashboards[action.id].body.pagination.fromPage = state.dashboards[action.id].body.pagination.lastPage - state.dashboards[action.id].body.pagination.showedPages + 1
                }else if(action.page===state.dashboards[action.id].body.pagination.fromPage){
                    let fromPage =state.dashboards[action.id].body.pagination.fromPage - state.dashboards[action.id].body.pagination.showedPages + 2
                    if(fromPage===0) stateCopy.dashboards[action.id].body.pagination.fromPage = 1
                    else  stateCopy.dashboards[action.id].body.pagination.fromPage = fromPage
                }
            }
            stateCopy.dashboards[action.id].body.pagination.currentPage = action.page
            return stateCopy
            
            // stateCopy = {...state}
            // stateCopy.logs = {...state.logs}
            // stateCopy.logs.pagination = {...state.logs.pagination}
            // if(action.page===1) stateCopy.logs.pagination.fromPage = 1
            // else{
            //     if(action.page===state.logs.pagination.fromPage+state.logs.pagination.showedPages-1 && action.page !== state.logs.pagination.lastPage){
            //         stateCopy.logs.pagination.fromPage = state.logs.pagination.fromPage + state.logs.pagination.showedPages - 2
            //     }else if(action.page===state.logs.pagination.lastPage){
            //         if(Math.ceil(state.logs.pagination.total/state.logs.pagination.showedLogs)<state.logs.pagination.showedPages)
            //             stateCopy.logs.pagination.fromPage = state.logs.pagination.lastPage - Math.ceil(state.logs.pagination.total/state.logs.pagination.showedLogs) + 1
            //         else stateCopy.logs.pagination.fromPage = state.logs.pagination.lastPage - state.logs.pagination.showedPages + 1
            //     }else if(action.page===state.logs.pagination.fromPage){
            //         let fromPage =state.logs.pagination.fromPage - state.logs.pagination.showedPages + 2
            //         if(fromPage===0) stateCopy.logs.pagination.fromPage = 1
            //         else  stateCopy.logs.pagination.fromPage = fromPage
            //     }
            // }
            // stateCopy.logs.pagination.currentPage = action.page
            // return stateCopy
        case CHANGE_SHOWED_LOGS:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.pagination = {...state.dashboards[action.id].body.pagination}
            for (let element of  state.dashboards[action.id].body.pagination.showedLogsList) {
                if (element===action.showedLogs) {
                    stateCopy.dashboards[action.id].body.pagination.showedLogs = action.showedLogs
                    stateCopy.dashboards[action.id].body.pagination.lastPage = Math.ceil(state.dashboards[action.id].body.pagination.total/action.showedLogs)
                    stateCopy.dashboards[action.id].body.pagination.currentPage = 1
                    stateCopy.dashboards[action.id].body.pagination.fromPage = 1
                    break;
                }
            }

            // stateCopy = {...state}
            // stateCopy.logs = {...state.logs}
            // stateCopy.logs.pagination = {...state.logs.pagination}
            // for (let element of  state.logs.pagination.showedLogsList) {
            //     if (element===action.showedLogs) {
            //         stateCopy.logs.pagination.showedLogs = action.showedLogs
            //         stateCopy.logs.pagination.lastPage = Math.ceil(state.logs.pagination.total/action.showedLogs)
            //         stateCopy.logs.pagination.currentPage = 1
            //         stateCopy.logs.pagination.fromPage = 1
            //         break;
            //     }
            // }
            
            return stateCopy
        case CHANGE_SORT_PARAM:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            if(action.sortParam.field===state.dashboards[action.id].body.sortParam.field){
                stateCopy.dashboards[action.id].body.sortParam = {...state.dashboards[action.id].body.sortParam}
                stateCopy.dashboards[action.id].body.sortParam.direction=stateCopy.dashboards[action.id].body.sortParam.direction==='asc'?'desc':'asc'
            }
            else{
                stateCopy.dashboards[action.id].body.sortParam = {
                    type: action.sortParam.type,
                    field: action.sortParam.field,
                    direction: 'asc'
                }
            }
            // stateCopy = {...state}
            // stateCopy.logs = {...state.logs}

            // if(action.sortParam.field===state.logs.sortParam.field){
            //     stateCopy.logs.sortParam = {...state.logs.sortParam}
            //     stateCopy.logs.sortParam.direction=stateCopy.logs.sortParam.direction==='asc'?'desc':'asc'
            // }
            // else{
            //     stateCopy.logs.sortParam = {
            //         type: action.sortParam.type,
            //         field: action.sortParam.field,
            //         direction: 'asc'
            //     }
            // }
            return stateCopy
        case CHANGE_CURRENT_LOG:
            stateCopy = {...state}
            stateCopy.logs = {...state.logs}
            stateCopy.logs.curLog = action.number
            return stateCopy
       default:
           return state;
   }
}
 
export const delObj = (id) => ({type: DEL_OBJ, id: id })

export const delEndp = (id) =>
    ({ type: DEL_ENDP, id: id })

export const addEndp = ({obj_num, ip, name, port, login, password, password_rep}) => (
    { type: ADD_ENDP, obj_num: obj_num, ip: ip, name: name, port: port, login: login, password: password, password_rep: password_rep })

export const addObj = ({id, name}) =>
({ type: ADD_OBJ, id, name })

export const changeMode = (mode) =>
({ type: CHANGE_MODE, mode: mode })

export const TimeFilter = (startDate, endDate,id) =>
({type: CHANGE_TIME, startDate, endDate,id})

export const uploadAcs = (json,reqObj,id) =>
({ type: UPLOAD_ACS, json, need: reqObj.need, id })

export const ParamFilter = (filter,id) =>
({type: CHANGE_PARAM_FILTER, filter,id})

export const onChangeCurrentLog = (number) =>
({type: CHANGE_CURRENT_LOG, number})

export const changePage = (page,id) =>
({type: CHANGE_PAGE, page,id})

export const changeUploads = (uploads,id) => ({ type: CHANGE_UPLOAD, uploads,id})
export const changeUpdatesParams = (params,id) => ({ type: CHANGE_UPLOAD_PARAMS, params,id})
export const changeShowedLogs = (showedLogs,id) => ({ type: CHANGE_SHOWED_LOGS, showedLogs,id})
export const changeSortParam = (sortParam,id) => ({ type: CHANGE_SORT_PARAM, sortParam,id})
export const uploadDashboards = (json) => ({type: UPLOAD_DASHBOARDS, json})

export const getAcs = (indexName,id) => {
    return (dispatch,getState) => {
        let state = getState().acs.logs
        // console.log('acs-form-processor.php')
        let timeFilter = {}
        if(state.uploads.uploads){
            timeFilter = {
                from: getFromDate(state.uploads.from_number,state.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                 to:  state.uploads.to
            }
        }
        else{
            timeFilter = {
                from: state.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }
        let reqObj={
                "need": "logs",
                indexName,
                timeFilter,
                paramsFilter: state.paramFilter,
                logsCount: state.pagination.showedLogs,
                curPage: state.pagination.currentPage,
                sortParam: state.sortParam
            }
            uniThunk(reqObj,[],dispatch,id)
    }
}
//РЕДУСЕР ДЛЯ АКС ОБЪЕКТОВ
// export const getAcs = (reqObj) => {
//     console.log('send!')
//     // if(reqObj.need==='logs'){
//     //     reqObj = {...reqObj, timeFilter: {} } 
//     // }
//     return (dispatch) => {
//         // console.log('acs-form-processor.php')
//         axios.post("php/acs-form-processor.php", reqObj).then(response => {
//             console.log(response)
//             let json = JSON.parse(response.request.response);
//             console.log(json)
//             dispatch(uploadAcs(json,reqObj));
//         }).catch(function (error) {
//             // handle error
//             console.log(error);
//           })
//           .finally(function () {
//             // always executed
//           });;
//     }
// }

export const changeUploadsThunk = (uploads,indexName,id) => {//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    return (dispatch,getState) => {
        let state = getState().acs.dashboards[id].body
        let timeFilter = {}
            timeFilter = {
                from: getFromDate(uploads.from_number,uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                 to:  state.uploads.to
            }
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            "paramsFilter": state.paramFilter,
            logsCount: state.pagination.showedLogs,
            curPage: 1,//state.pagination.currentPage
            sortParam: state.sortParam
        }
        uniThunk(reqObj,[changeUpdatesParams(uploads,id),changePage(1,id)],dispatch,id)
    }
}

export const addFieldThunk = (reqObj) => {
    console.log(reqObj)
    if(Object.values(reqObj.form).length === translator[reqObj.mode].field_len){
            if(reqObj.form.pass===reqObj.form.pass_rep){
                delete reqObj.form.pass_rep
                // reqObj.obj = state.settings.cameras.objects[reqObj.obj]
                return (dispatch) => {
                    let json={form: reqObj.form, addField: {uni_type: translator[reqObj.mode].uni_type, uni_val: reqObj.form[translator[reqObj.mode].uni_type], tb_name: translator[reqObj.mode].tb_name}}
                    console.log(json)
                    axios.post("php/acs-form-processor.php",json).then(response => {
                        console.log(response)
                        json = JSON.parse(response.request.response);
                        console.log(json)
                        if(json.result==="done")
                            switch (reqObj.mode) {
                                case 'addObj':
                                    console.log({...reqObj.form, id: json.id})
                                    return   dispatch(addObj(reqObj.form));
                                case 'addEndp':
                                    return   dispatch(addEndp({...reqObj.form, id: json.id}));
                                default:
                                    return {type: ''};
                            }
                        else alert(`Пользователь с таким ${translator[reqObj.mode].uni_type} уже существует`)
                    }).catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .finally(function () {
                        // always executed
                    });
                }
        }
        else  {
            alert('Содержимое полей "Пароль" и "Повторный пароль" должно совпадать')
            return {type: '' }
        }
    }
    else  {
        alert("Необходимо заполнить все поля")
        return {type: '' }
    }
}


export const changeShowedLogsThunk = (showedLogs,indexName,id) => {

    
    return (dispatch,getState) => {
        let state = getState().acs.dashboards[id].body
        let timeFilter = {}
        if(state.uploads.uploads){
            timeFilter = {
                from: getFromDate(state.uploads.from_number,state.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                 to:  state.uploads.to
            }
        }
        else{
            timeFilter = {
                from: state.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            "paramsFilter": state.paramFilter,
            logsCount: showedLogs,
            curPage: 1,//state.pagination.currentPage
            sortParam: state.sortParam
        }
        uniThunk(reqObj,[changeShowedLogs(showedLogs,id),changePage(1,id)],dispatch,id)
    }
}
const uniThunk = (reqObj,dispatches,dispatch, id) => {
        console.log(reqObj)
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(reqObj['need']==='logs') dispatch(uploadAcs(json, reqObj, id))
            if(reqObj['need']==='dashboards') dispatch(uploadDashboards(json))
            dispatches.forEach(obj => dispatch(obj))
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
}
export const changePageThunk = (page,indexName,id) => {
    // console.log(reqObj)
    return (dispatch, getState) => {
        let state = getState().acs.dashboards[id].body
        let timeFilter = {}
        if(state.uploads.uploads){
            timeFilter = {
                from: getFromDate(state.uploads.from_number,state.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                 to:  state.uploads.to
            }
        }
        else{
            timeFilter = {
                from: state.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }
        let reqObj = {
            "need": "logs",
            indexName,
            "timeFilter": timeFilter,
            "paramsFilter": state.paramFilter,
            logsCount: state.pagination.showedLogs,
            curPage: page,
            sortParam: state.sortParam
        }
        uniThunk(reqObj,[changePage(page,id)],dispatch,id)
    }
} 

export const setTimeFilterThunk = (startDate, endDate,indexName,id) => {
        return (dispatch, getState) => {
            let state = getState().acs.dashboards[id].body
            let reqObj = {
                "need": "logs",
                indexName,
                "timeFilter": {
                    from: startDate.format('YYYY/MM/DD HH:mm:ss'),
                    to:  endDate.format('YYYY/MM/DD HH:mm:ss'),
                },
                "paramsFilter": state.paramFilter,
                logsCount: state.pagination.showedLogs,
                // curPage: state.pagination.currentPage,
                curPage: 1,
                sortParam: state.sortParam       
            }
            // console.log('acs-form-processor.php')
            uniThunk(reqObj,[TimeFilter(startDate, endDate,id),changeUploads(false,id),changePage(1,id)],dispatch,id)
        }

}

// uploads,timeFilter,filter,showedLogs,page
export const setParamFilterThunk = (filter,indexName,id) => {
    console.log(filter)
    let filterCopy = {}
    for (let param in filter) {
        if(filter[param].length!==0) filterCopy[param] = filter[param]
    }
    
    delete filterCopy.opened
    return (dispatch,getState) => {
        let state = getState().acs.dashboards[id].body
        let timeFilter = {}
        if(state.uploads.uploads){
            timeFilter = {
                // from: 'now-'+state.uploads.from_number+state.uploads.from_time_type+'/'+state.uploads.from_time_type,
                from: getFromDate(state.uploads.from_number,state.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                to:  state.uploads.to
            }
        }
        else{
            timeFilter = {
                from: state.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }
        let  reqObj={
                "need": "logs",
                indexName,
                timeFilter,
                "paramsFilter": filterCopy,
                logsCount: state.pagination.showedLogs,
                // curPage: state.pagination.currentPage,
                curPage: 1,
                sortParam: state.sortParam           
            };
            uniThunk(reqObj,[ParamFilter(filterCopy,id),changePage(1,id)],dispatch,id)          
    }
}

export const changeSortThunk = (sortParam,indexName,id) => {
    return (dispatch,getState) => {
        let state = getState().acs.dashboards[id].body
        let timeFilter,NewSortParam = {}
        if(state.uploads.uploads){
            timeFilter = {
                // from: 'now-'+state.uploads.from_number+state.uploads.from_time_type+'/'+state.uploads.from_time_type,
                from: getFromDate(state.uploads.from_number,state.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                to:  state.uploads.to
            }
        }else{
            timeFilter = {
                from: state.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }
        if(sortParam.field===state.sortParam.field){
            NewSortParam = {...state.sortParam}
            NewSortParam.direction=NewSortParam.direction==='asc'?'desc':'asc'
        }else{
            NewSortParam = {
                type: sortParam.type,
                field: sortParam.field,
                direction: 'asc'
            }
        }
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            "paramsFilter": state.paramFilter,
            logsCount: state.pagination.showedLogs,
            curPage: state.pagination.currentPage,
            sortParam: NewSortParam
        }
        uniThunk(reqObj,[dispatch(changeSortParam(sortParam,id))],dispatch,id)
    }
}

export const  getFromDate = (from_number,from_time_type)=>{
    let a = moment(Date.now())//.subtract(60, "days")
      switch(from_time_type){
        case 's':
          return a.subtract(from_number, "seconds")
        case 'm':
          return a.subtract(from_number, "minutes")
        case 'h':
          return a.subtract(from_number, "hours")
        case 'd':
          return a.subtract(from_number, "days")
        case 'M':
          return a.subtract(from_number, "months")
      }
  }

export const  getDashboardsThunk = () => {
    return (dispatch) => {
    let reqObj = {
        "need": "dashboards",
        }
        uniThunk(reqObj,[],dispatch)
    }
}

export default acsReducer;