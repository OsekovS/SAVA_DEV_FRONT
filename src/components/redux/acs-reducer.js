import * as axios from 'axios'
import moment from "moment"

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

let initialState = function(){
    let now = new Date()
    let toDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
    let fromDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0))).subtract(60, "days")
//    console.log(toDate)
//    console.log(fromDate)
    return {
        settings: {
        mode: 'view',//'view',
        objects: [
            {id: '0', name: 'Санаторий Звенигород'},
            {id: '1', name: 'Больница №46'},
            {id: '2', name: 'Детский сад "Яблочко"'},
            {id: '3', name: 'Офис'}
        ],
        endpoints:  [{
            id: '0',
            object: 'Санаторий Звенигород',
            ip: '111.111.11.11',
            name: 'Заезд для машин',
            port: '3000',
            login: '3ojA'
        },
        {
            id: '1',
            object: 'Больница №46',
            ip: '222.222.22.22',
            name: 'Главный вход',
            port: '3000',
            login: '2miZ'
        },
        {
            id: '2',
            object: 'Детский сад "Яблочко"',
            ip: '444.444.444.444',
            name: 'Северный вход',
            port: '3000',
            login: 'aiZ'
        }]
        },
        logs: {
            logs:  [{
                "time":"2019\/11\/06 12:53:11",
                "ip_cam":"192.168.3.109",
                "type":"Event",
                "comment":"Motion detect",
                "param":"2019-11-06 12:50:40"
            },
            {
                "time":"2019\/11\/06 12:53:11",
                "ip_cam":"192.168.3.109",
                "type":"Event",
                "comment":"Motion detect",
                "param":"2019-11-06 12:51:37"
            }],
            bar1: {series: [{
                data: [13, 17, 19]           
                }],
                xLabels : ['-','e','x']
            },
            bar2: {series: [{
                data: [13, 17, 19]           
                }],
                xLabels : ['xz','e','x']
            },
            timeFilter: {
                from: fromDate,
                to: toDate
            },
            uploads: {
              uploads: false,
              timeKind: 1,
              timeNum: 10000,
              from_number: '2',
              from_time_type: 'M',
              to: "now/d"
            },
            paramFilter: {},
            pagination: {
                total: '',
                currentPage: 1,
                fromPage: 1,
                showedPages: 5,
                lastPage: '',
                showedLogs: 100,
                showedLogsList: [50, 100, 250, 500]
            },
            sortParam: {
                type:'date',
                field:'time',
                direction: 'asc'
            },
            curLog: null
        }
       
    }
}()

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
       case ADD_ENDP:
            // console.log(action)
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
            // return state;
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
            // console.log(stateCopy)
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
                // console.log(state.logs.bar.series)
                stateCopy.logs.logs = action.json.logs.map( (e) => e._source)
                stateCopy.logs.bar1.series = [{data: Object.values(action.json.bar1.series.data)}]
                stateCopy.logs.bar1.xLabels = Object.values(action.json.bar1.xLabels);
                stateCopy.logs.bar2.series = [{data: Object.values(action.json.bar2.series.data)}]
                stateCopy.logs.bar2.xLabels = Object.values(action.json.bar2.xLabels);
                stateCopy.logs.pagination.total = action.json.total
                stateCopy.logs.pagination.lastPage = Math.ceil(action.json.total/stateCopy.logs.pagination.showedLogs)
                // console.log(stateCopy.logs.bar.series)
            }
                return stateCopy
        case CHANGE_TIME:
            console.log(moment(action.startDate).format('YYYY/MM/DD HH:MM:SS')) //"2019/12/16 14:00:00 YYYY/MM/DD HH:MM:SS
            stateCopy = {...state};
            stateCopy.logs = {...state.logs}
            stateCopy.logs.timeFilter = {...state.logs.timeFilter}
            stateCopy.logs.timeFilter.from = moment(action.startDate)
            stateCopy.logs.timeFilter.to = moment(action.endDate)
            
            return stateCopy
        case CHANGE_PARAM_FILTER:
            stateCopy = {...state};
            stateCopy.logs = {...state.logs}
            
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
            stateCopy.logs.paramFilter = copyData
            return stateCopy
        case CHANGE_UPLOAD:
            stateCopy = {...state}
            stateCopy.logs = {...state.logs}
            stateCopy.logs.uploads = {...state.logs.uploads}
            stateCopy.logs.uploads.uploads = action.uploads
            return stateCopy
        case CHANGE_UPLOAD_PARAMS:
            stateCopy = {...state}
            stateCopy.logs = {...state.logs}
            stateCopy.logs.uploads = {...state.logs.uploads}
            stateCopy.logs.uploads.timeNum = action.params.timeNum
            stateCopy.logs.uploads.timeKind = parseInt(action.params.timeKind)
            stateCopy.logs.uploads.from_number = action.params.from_number
            stateCopy.logs.uploads.from_time_type = action.params.from_time_type
            console.log(action)
            return stateCopy
        case CHANGE_PAGE:
            console.log(action.page)
            stateCopy = {...state}
            stateCopy.logs = {...state.logs}
            stateCopy.logs.pagination = {...state.logs.pagination}
            // if(action.page===state.logs.pagination.lastPage)
            if(action.page===1) stateCopy.logs.pagination.fromPage = 1
            else{
                if(action.page===state.logs.pagination.fromPage+state.logs.pagination.showedPages-1 && action.page !== state.logs.pagination.lastPage){
                    stateCopy.logs.pagination.fromPage = state.logs.pagination.fromPage + state.logs.pagination.showedPages - 2
                }else if(action.page===state.logs.pagination.lastPage){
                    if(Math.ceil(state.logs.pagination.total/state.logs.pagination.showedLogs)<state.logs.pagination.showedPages)
                        stateCopy.logs.pagination.fromPage = state.logs.pagination.lastPage - Math.ceil(state.logs.pagination.total/state.logs.pagination.showedLogs) + 1
                    else stateCopy.logs.pagination.fromPage = state.logs.pagination.lastPage - state.logs.pagination.showedPages + 1
                }else if(action.page===state.logs.pagination.fromPage){
                    let fromPage =state.logs.pagination.fromPage - state.logs.pagination.showedPages + 2
                    if(fromPage===0) stateCopy.logs.pagination.fromPage = 1
                    else  stateCopy.logs.pagination.fromPage = fromPage
                }
            }
            stateCopy.logs.pagination.currentPage = action.page
            return stateCopy
        case CHANGE_SHOWED_LOGS:
            stateCopy = {...state}
            stateCopy.logs = {...state.logs}
            stateCopy.logs.pagination = {...state.logs.pagination}
            for (let element of  state.logs.pagination.showedLogsList) {
                if (element===action.showedLogs) {
                    stateCopy.logs.pagination.showedLogs = action.showedLogs
                    stateCopy.logs.pagination.lastPage = Math.ceil(state.logs.pagination.total/action.showedLogs)
                    stateCopy.logs.pagination.currentPage = 1
                    stateCopy.logs.pagination.fromPage = 1
                    break;
                }
            }
            
            return stateCopy
        case CHANGE_SORT_PARAM:
            stateCopy = {...state}
            stateCopy.logs = {...state.logs}

            if(action.sortParam.field===state.logs.sortParam.field){
                stateCopy.logs.sortParam = {...state.logs.sortParam}
                stateCopy.logs.sortParam.direction=stateCopy.logs.sortParam.direction==='asc'?'desc':'asc'
            }
            else{
                stateCopy.logs.sortParam = {
                    type: action.sortParam.type,
                    field: action.sortParam.field,
                    direction: 'asc'
                }
            }
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

export const TimeFilter = (startDate, endDate) =>
({type: CHANGE_TIME, startDate, endDate})

export const uploadAcs = (json,reqObj) =>
({ type: UPLOAD_ACS, json, need: reqObj.need })

export const ParamFilter = (filter) =>
({type: CHANGE_PARAM_FILTER, filter})

export const onChangeCurrentLog = (number) =>
({type: CHANGE_CURRENT_LOG, number})

export const changePage = (page) =>
({type: CHANGE_PAGE, page})

export const changeUploads = (uploads) => ({ type: CHANGE_UPLOAD, uploads})
export const changeUpdatesParams = (params) => ({ type: CHANGE_UPLOAD_PARAMS, params})
export const changeShowedLogs = (showedLogs) => ({ type: CHANGE_SHOWED_LOGS, showedLogs})
export const changeSortParam = (sortParam) => ({ type: CHANGE_SORT_PARAM, sortParam})

export const getAcs = (reqObj) => {
    console.log('send!')
    // if(reqObj.need==='logs'){
    //     reqObj = {...reqObj, timeFilter: {} } 
    // }
    return (dispatch) => {
        // console.log('acs-form-processor.php')
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(uploadAcs(json,reqObj));
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
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

export const changeShowedLogsThunk = (showedLogs) => {

    
    return (dispatch,getState) => {
        let state = getState().acs.logs
        let timeFilter = {}
        if(state.uploads.uploads){
            timeFilter = {
                from: 'now-'+state.uploads.from_number+state.uploads.from_time_type+'/'+state.uploads.from_time_type,
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
            "timeFilter": timeFilter,
            "paramsFilter": state.paramFilter,
            logsCount: showedLogs,
            curPage: '1',//state.pagination.currentPage
            sortParam: state.sortParam
            // curPage: state.pagination.currentPage
        }
        console.log(reqObj)
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            // console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(uploadAcs(json, reqObj));
            dispatch(changeShowedLogs(showedLogs));
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
    }
}
// timeFilter, paramFilter, showedLogs, 
export const changePageThunk = (page) => {
    // console.log(reqObj)
    return (dispatch,getState) => {
        let state = getState().acs.logs
        let timeFilter = {}
        if(state.uploads.uploads){
            timeFilter = {
                from: 'now-'+state.uploads.from_number+state.uploads.from_time_type+'/'+state.uploads.from_time_type,
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
            "timeFilter": timeFilter,
            "paramsFilter": state.paramFilter,
            logsCount: state.pagination.showedLogs,
            curPage: page,
            sortParam: state.sortParam
        }
        
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            // console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(uploadAcs(json, reqObj));
            dispatch(changePage(page));
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
    }
}
//filter, showedLogs, page, 
export const setTimeFilterThunk = (startDate, endDate) => {
       
        return (dispatch,getState) => {
            let state = getState().acs.logs
            let reqObj = {
                "need": "logs",
                "timeFilter": {
                    from: startDate.format('YYYY/MM/DD HH:MM:SS'),
                    to:  endDate.format('YYYY/MM/DD HH:MM:SS'),
                },
                "paramsFilter": state.paramFilter,
                logsCount: state.pagination.showedLogs,
                curPage: state.pagination.currentPage,
                sortParam: state.sortParam       
            }
            // console.log('acs-form-processor.php')
            axios.post("php/acs-form-processor.php", reqObj).then(response => {
                // console.log(response)
                let json = JSON.parse(response.request.response);
                console.log(json)
                dispatch(uploadAcs(json, reqObj));
                dispatch(TimeFilter(startDate, endDate))
                dispatch(changeUploads(false))
            }).catch(function (error) {
                // handle error
                console.log(error);
              })
              .finally(function () {
                // always executed
              });;
        }
        // dispatch(TimeFilter(startDate, endDate));

}

// uploads,timeFilter,filter,showedLogs,page
export const setParamFilterThunk = (filter) => {
    console.log(filter)
    let filterCopy = {}
    for (let param in filter) {
        if(filter[param].length!==0) filterCopy[param] = filter[param]
    }
    
    delete filterCopy.opened
    return (dispatch,getState) => {
        let state = getState().acs.logs
        let timeFilter = {}
        if(state.uploads.uploads){
            timeFilter = {
                from: 'now-'+state.uploads.from_number+state.uploads.from_time_type+'/'+state.uploads.from_time_type,
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
                "timeFilter": timeFilter,
                "paramsFilter": filterCopy,
                logsCount: state.pagination.showedLogs,
                curPage: state.pagination.currentPage,
                sortParam: state.sortParam           
            };
            axios.post("php/acs-form-processor.php", reqObj).then(response => {
            console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(uploadAcs(json,reqObj));
            dispatch(ParamFilter(filterCopy))
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });;
        // }
            
    }
}

export const changeSortThunk = (sortParam) => {
    console.log(sortParam)
    return (dispatch,getState) => {
        let state = getState().acs.logs
        let timeFilter,NewSortParam = {}
        if(state.uploads.uploads){
            timeFilter = {
                from: 'now-'+state.uploads.from_number+state.uploads.from_time_type+'/'+state.uploads.from_time_type,
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
            "timeFilter": timeFilter,
            "paramsFilter": state.paramFilter,
            logsCount: state.pagination.showedLogs,
            curPage: state.pagination.currentPage,
            sortParam: NewSortParam
        }
        
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            // console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(uploadAcs(json, reqObj));
            dispatch(changeSortParam(sortParam))
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
    }
}


export default acsReducer;