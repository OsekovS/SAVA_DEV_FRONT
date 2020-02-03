import * as axios from 'axios'

const DEL_ENDP = 'DEL_ISS_ENDP';
const DEL_OBJ = 'DEL_ISS_OBJ';
const ADD_ENDP = 'ADD_ISS_ENDP'
const ADD_OBJ = 'ADD_ISS_OBJ'
const CHANGE_MODE = 'CHANGE_ISS_MODE'
const UPLOAD_ISS = 'UPLOAD_ISS'
const UPLOAD_ACS_DASHBOARDS = 'UPLOAD_ISS_DASHBOARDS'
const CHANGE_TIME = 'CHANGE_ISS_TIME'
const CHANGE_UPLOAD = 'CHANGE_ISS_UPLOAD'
const CHANGE_PARAM_FILTER = 'CHANGE_ISS_PARAM_FILTER'
const CHANGE_UPLOAD_PARAMS = 'CHANGE_ISS_UPLOAD_PARAMS'
const CHANGE_PAGE = 'CHANGE_ISS_PAGE'
const CHANGE_SHOWED_LOGS = 'CHANGE_ISS_SHOWED_LOGS'
const CHANGE_SORT_PARAM = 'CHANGE_ISS_SORT_PARAM'
const CHANGE_CURRENT_LOG = 'CHANGE_ISS_CURRENT_LOG'
const UPLOAD_DASHBOARDS = 'UPLOAD_ISS_DASHBOARDS'
const UPLOAD_CIRCLE_DIAGRAM = 'UPLOAD_ISS_CIRCLE_DIAGRAM'
const CHANGE_MAIN_FIELD = 'CHANGE_ISS_MAIN_FIELD'
const CHANGE_MAIN_FIELD_LIST = 'CHANGE_ISS_MAIN_FIELD_LIST'

let initialState = {
    settings: { 
        mode: 'view',
        objects: [
        {id: '0', name: 'Санаторий Звенигород'},
        {id: '1', name: 'Больница №46'},
        {id: '2', name: 'Детский сад "Яблочко"'},
        {id: '3', name: 'Офис'}
    ],
        endpoints:   [{
            id: '0',
            object: 'Санаторий Звенигород',
            ip: '333.111.333.11',
            name: 'Комп Сергея',
            port: '6000',
            login: '3ojA'
        },
        {
            id: '1',
            object: 'Больница №46',
            ip: '222.999.22.22',
            name: 'Комп Елены',
            port: '6000',
            login: '2miZ'
        },
        {
            id: '2',
            object: 'Детский сад "Яблочко"',
            ip: '777.444.444.777',
            name: 'Комп Кота',
            port: '6000',
            login: 'aiZ'
        }]
},
logs: 
[{
    "time":"2019\/11\/06 12:53:11",
    "ip_cam":"192.168.3.109",
    "type":"Event",
    "comment":"Motion detect",
    "param":"2019-11-06 12:51:37"
}]
};

const issReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
    case UPLOAD_DASHBOARDS:
        stateCopy = {...state};
        stateCopy.dashboards = []
        action.json.dashboards.forEach(dash => {
            let body = JSON.parse(dash[4])   
            let toDate = moment(new Date(body.timeFilter.to))//moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
            let fromDate = moment(new Date(body.timeFilter.from))//moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0))).subtract(body.timeFilter.from.number, body.timeFilter.from.type)
                // body.mode = 'afterlastSession'
                body.timeFilter= {
                    from: fromDate,
                    to: toDate
                }
                // body.uploads.uploads=true;
                body.pdf=body.saver=body.markAsRead='wait'
            stateCopy.dashboards[dash[0]] = {
                id: dash[0],
                name: dash[1],
                type: dash[2],
                body: body,
            }
        });
        stateCopy.filters={}
        
        action.json.filters.forEach(filter => {
            stateCopy.filters[filter[0]]=JSON.parse(filter[1])
        });
           return stateCopy
        // case SIDEBAR_CHANGE:
        //     return stateCopy
       case UPLOAD_CIRCLE_DIAGRAM:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.logs = {...state.dashboards[action.id].body.logs}
            stateCopy.dashboards[action.id].body.logs = action.json.logs
            console.log(action)
            console.log(stateCopy.dashboards[action.id].body.logs)
           return stateCopy
        case UPLOAD_ACS_DASHBOARDS:
            stateCopy = {...state};
            // console.log(state)
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            // console.log(action)
            stateCopy.dashboards[action.id].body.logs = action.json.logs.map( (e) => e._source)
            stateCopy.dashboards[action.id].body.pagination = {...state.dashboards[action.id].body.pagination}
            stateCopy.dashboards[action.id].body.pagination.total = action.json.total
            stateCopy.dashboards[action.id].body.pagination.lastPage = Math.ceil(action.json.total/stateCopy.dashboards[action.id].body.pagination.showedLogs)
            // console.log(stateCopy.dashboards[action.id])
            return stateCopy
        case CHANGE_TIME:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
  
            stateCopy.dashboards[action.id].body.timeFilter = {...state.dashboards[action.id].body.timeFilter}
            stateCopy.dashboards[action.id].body.timeFilter.from = (action.startDate)
            stateCopy.dashboards[action.id].body.timeFilter.to = (action.endDate)

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

        case CHANGE_UPLOAD:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.uploads = {...state.dashboards[action.id].body.uploads}
            stateCopy.dashboards[action.id].body.uploads.uploads = action.uploads

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

            return stateCopy
        case CHANGE_PAGE:
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
            return stateCopy
        case CHANGE_SORT_PARAM:
            
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            console.log(state.dashboards[action.id].body.sortParam.field)
            console.log(action.sortParam.field)
            // stateCopy.dashboards[action.id].body.sortParam = {...state.dashboards[action.id].body.sortParam}
            if(action.sortParam.field===state.dashboards[action.id].body.sortParam.field){
                console.log('change')
                stateCopy.dashboards[action.id].body.sortParam = {...state.dashboards[action.id].body.sortParam}
                stateCopy.dashboards[action.id].body.sortParam.direction=stateCopy.dashboards[action.id].body.sortParam.direction==='asc'?'desc':'asc'
            }
            else{
                console.log('new')
                stateCopy.dashboards[action.id].body.sortParam = {
                    type: action.sortParam.type,
                    field: action.sortParam.field,
                    direction: 'asc'
                }
            }
            return stateCopy
        case CHANGE_CURRENT_LOG:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.curLog = action.number
            return stateCopy
        case CHANGE_MAIN_FIELD:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body}
            stateCopy.dashboards[action.id].body.paramFilter = {...state.dashboards[action.id].body.paramFilter}
            //убираем старый paramFilter
            delete stateCopy.dashboards[action.id].body.paramFilter[stateCopy.dashboards[action.id].body.field]
            stateCopy.dashboards[action.id].body.field = action.value
            return stateCopy
        case CHANGE_MAIN_FIELD_LIST:
            stateCopy = {...state};
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards[action.id] = {...state.dashboards[action.id]}
            stateCopy.dashboards[action.id].body = {...state.dashboards[action.id].body} 
            stateCopy.dashboards[action.id].body.paramFilter = {...state.dashboards[action.id].body.paramFilter}        
            stateCopy.dashboards[action.id].body.paramFilter[stateCopy.dashboards[action.id].body.field] = action.list    
            return stateCopy




       case ADD_ENDP:
            console.log(action)
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
                {id: state.settings.objects.length ,name: action.obj_name}]
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
            console.log(stateCopy)
            return stateCopy
        case UPLOAD_ISS:
            stateCopy = {...state};
            if(action['need']==='settings'){
            stateCopy.settings.endpoints = action.json.endpoints.map( (e) => ({
                id: e[0],
                object: e[1],
                ip: e[2],
                name: e[3],
                port: e[4],
                login: e[5]
            }))
            stateCopy.settings.registrators = action.json.registrators.map( (e) => ({
                id: e[0], name: e[1]
            }))
        }
        else{
            stateCopy.settings.logs = action.json.registrators.map( (e) => ({
                time: e['time'],
                ip_cam: e['ip_cam'],
                type: e['type'],
                comment: e['comment'],
                param: e['param']
            }))
        }
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

export const addObj = ({obj_name}) =>
({ type: ADD_OBJ, obj_name: obj_name })

export const changeMode = (mode) =>
({ type: CHANGE_MODE, mode: mode })

export const uploadIss = (json) =>
({ type: UPLOAD_ISS, json })





export const TimeFilter = (startDate, endDate,id) =>
({type: CHANGE_TIME, startDate, endDate,id})

export const uploadAcs = (json,reqObj,id) =>
({ type: UPLOAD_ACS_DASHBOARDS, json, need: reqObj.need, id })

export const ParamFilter = (filter,id) =>
({type: CHANGE_PARAM_FILTER, filter,id})

export const onChangeCurrentLog = (number,id) =>
({type: CHANGE_CURRENT_LOG, number,id})

export const changePage = (page,id) =>
({type: CHANGE_PAGE, page,id})

const uploadCircleDiagram = (json,id) =>
({type: UPLOAD_CIRCLE_DIAGRAM ,json, id})

export const changeUploads = (uploads,id) => ({ type: CHANGE_UPLOAD, uploads,id})
export const changeUpdatesParams = (params,id) => ({ type: CHANGE_UPLOAD_PARAMS, params,id})
export const changeShowedLogs = (showedLogs,id) => ({ type: CHANGE_SHOWED_LOGS, showedLogs,id})
export const changeSortParam = (sortParam,id) => ({ type: CHANGE_SORT_PARAM, sortParam,id})
export const uploadDashboards = (json) => ({type: UPLOAD_DASHBOARDS, json})
export const changeMainField = (value,id) => ({ type: CHANGE_MAIN_FIELD, value,id})
export const changeMainFieldList = (id,list) => ({ type: CHANGE_MAIN_FIELD_LIST, list,id})





export const getIss = (reqObj) => {
    return (dispatch) => {
        console.log('iss-form-processor.php')
        axios.post("iss-form-processor.php", reqObj).then(response => {
            let json = JSON.parse(response);
            json['need'] = reqObj['need']
            dispatch(uploadIss(json));
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}

export default issReducer;