import * as axios from 'axios'
import moment from "moment"
import {acsIni} from './IniStates.js'

const UPLOAD_ACS_DASHBOARDS = 'UPLOAD_ACS_DASHBOARDS'
const CHANGE_TIME = 'CHANGE_TIME'
const CHANGE_UPLOAD = 'CHANGE_UPLOAD'
const CHANGE_PARAM_FILTER = 'CHANGE_PARAM_FILTER'
const CHANGE_UPLOAD_PARAMS = 'CHANGE_UPLOAD_PARAMS'
const CHANGE_PAGE = 'CHANGE_PAGE'
const CHANGE_SHOWED_LOGS = 'CHANGE_SHOWED_LOGS'
const CHANGE_SORT_PARAM = 'CHANGE_SORT_PARAM'
const CHANGE_CURRENT_LOG = 'CHANGE_CURRENT_LOG'
const UPLOAD_DASHBOARDS = 'UPLOAD_DASHBOARDS'
const UPLOAD_CIRCLE_DIAGRAM = 'UPLOAD_CIRCLE_DIAGRAM'
const CHANGE_MAIN_FIELD = 'CHANGE_MAIN_FIELD'
const CHANGE_MAIN_FIELD_LIST = 'CHANGE_MAIN_FIELD_LIST'
// const SIDEBAR_CHANGE = 'SIDEBAR_CHANGE';
const dummy = {type: ''}
// let initialState = acsIni()
let {dashboards} = acsIni()
// let initialState = {
//     dashboards,logs
// }


const acsReducer = (state = dashboards, action) => {
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
       default:
           return state;
   }
}
 




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

const  prepareTimefilter = (getState,dbName,state,indexName)=>{
    
    const module = getState().auth.briefUserInfo.modules[dbName]
    // console.log(module)
    // console.log(dbName,state,indexName)
    if(module.mode==='lastViewed')  return {
        from: module.indexes[indexName].lastViewed,
         to:  state.body.uploads.to
    }
    else if(state.body.uploads.uploads){
        return {
            from: getFromDate(state.body.uploads.from_number,state.body.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
             to:  state.body.uploads.to
        }
    }else{
        return {
            from: state.body.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
            to:  state.body.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
        }
    }
  }

export const getAcs = (id,indexName,dbName) => {
   
    return (dispatch,getState) => {
        
        let state = getState().acs.dashboards.dashboards[id]
        
        // console.log('acs-form-processor.php')
        let specialObject = {}
        let need
        // if(state.body.uploads.uploads){
        // if(mode=='lastViewed') timeFilter = 'lastViewed'
        let timeFilter = prepareTimefilter(getState,dbName,state,indexName)

        if(state.type==='Table') {
            specialObject={
                logsCount: state.body.pagination.showedLogs,
                curPage: state.body.pagination.currentPage,
                sortParam: state.body.sortParam
            }
            need = "logs"
        }else if(state.type==='Circle_Diagram'){
            // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            specialObject={
                fieldName: state.body.field,
                //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                getState().acs.dashboards.filters[state.body.indexName][state.body.field]:
                state.body.paramFilter[state.body.field]
                // fieldList: ["Детский садик 'вишенка'", "Крематорий 'барбекью'"]
            }
            need = 'Circle_Diagram'
        }
        let reqObj={
                need,
                indexName:state.body.indexName,
                timeFilter,
                paramsFilter: state.body.paramFilter,
                dashType: state.type,
                specialObject
            }
            uniThunk(reqObj,[],dispatch,id)
    }
}

export const ChangeMainFieldThunk = (indexName,id,keyState,dashField) => {
    return (dispatch,getState) => {
        let state = getState().acs.dashboards.dashboards[id]
        let timeFilter = {}
        
        if(state.body.uploads.uploads){
            timeFilter = {
                from: getFromDate(state.body.uploads.from_number,state.body.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                 to:  state.body.uploads.to
            }
        }else{
            timeFilter = {
                from: state.body.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.body.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }

            
                let reqObj = {
                    "need": "logs",
                    indexName,
                    timeFilter,
                    "paramsFilter": state.body.paramFilter,
                    dashType: state.type,
                    specialObject: {
                        fieldList: keyState,
                        fieldName: dashField
                    }
                }
                uniThunk(reqObj,[changeMainField(keyState)],dispatch,id)
    }
}
export const changeUploadModeThunk = (uploadMode,indexName,id) => {//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    return (dispatch,getState) => {
        let state = getState().acs.dashboards.dashboards[id]
        let timeFilter, specialObject = {}
        let reducers = [changeUploads(uploadMode,id)]
        
        if(uploadMode){
            timeFilter = {
                from: getFromDate(state.body.uploads.from_number,state.body.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                 to:  state.body.uploads.to
            }
        }else{
            timeFilter = {
                from: state.body.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.body.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }
        switch (state.type) {
            case 'Table':
                specialObject={
                    logsCount: state.body.pagination.showedLogs,
                    curPage: 1,
                    sortParam: state.body.sortParam
                }
                reducers.push(changePage(1,id))
        }
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            "paramsFilter": state.body.paramFilter,
            dashType: state.type,
            specialObject
        }
        uniThunk(reqObj,reducers,dispatch,id)
    }
}
export const changeUploadsThunk = (uploads,indexName,id) => {//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (dispatch,getState) => {
        let reducers = [changeUpdatesParams(uploads,id),changeUploads(true,id)]
        let state = getState().acs.dashboards.dashboards[id]
        let timeFilter, specialObject = {}
            timeFilter = {
                from: getFromDate(uploads.from_number,uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                 to:  state.body.uploads.to
            }
        let need
        if(state.type==='Table') {
            specialObject={
                logsCount: state.body.pagination.showedLogs,
                curPage: 1,
                sortParam: state.body.sortParam 
            }
            need = 'logs'
            reducers.push(changePage(1,id))
        }else if(state.type==='Circle_Diagram'){
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            specialObject={
                fieldName: state.body.field,
                //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                getState().acs.dashboards.filters[state.body.indexName][state.body.field]:
                state.body.paramFilter[state.body.field]
                // fieldList: ["Детский садик 'вишенка'", "Крематорий 'барбекью'"]
            }
            need = 'Circle_Diagram'
        }        
        let reqObj = {
            need,
            indexName,
            timeFilter,
            "paramsFilter": state.body.paramFilter,
            dashType: state.type,
            specialObject
        }
        uniThunk(reqObj,reducers,dispatch,id)
    }
}



export const changeShowedLogsThunk = (showedLogs,indexName,dbName,id) => {
    return (dispatch,getState) => {
        let state = getState().acs.dashboards.dashboards[id]
        let timeFilter = prepareTimefilter(getState,dbName,state,indexName)
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            dashType: state.type,
            "paramsFilter": state.body.paramFilter,
            specialObject: {
                logsCount: showedLogs,
                curPage: 1,//state.pagination.currentPage
                sortParam: state.body.sortParam
            }
        }
        uniThunk(reqObj,[changeShowedLogs(showedLogs,id),changePage(1,id)],dispatch,id)
    }
}

export const changePageThunk = (page,indexName,id,dbName) => {
    return (dispatch, getState) => {
        let state = getState().acs.dashboards.dashboards[id]       
        let timeFilter = prepareTimefilter(getState,dbName,state,indexName)
        let reqObj = {
            "need": "logs",
            indexName,
            "timeFilter": timeFilter,
            "paramsFilter": state.body.paramFilter,
            dashType: state.type,
            specialObject: {
                logsCount: state.body.pagination.showedLogs,
                curPage: page,
                sortParam: state.body.sortParam
            }
        }
        uniThunk(reqObj,[changePage(page,id)],dispatch,id)
    }
} 

export const setTimeFilterThunk = (startDate, endDate,indexName,id) => {
        return (dispatch, getState) => {
            let state = getState().acs.dashboards.dashboards[id]
            let specialObject = {}
            let reducers = [TimeFilter(startDate, endDate,id),changeUploads(false,id)]
            let need
            if(state.type==='Table') {
                specialObject={
                    logsCount: state.body.pagination.showedLogs,
                    curPage: 1,
                    sortParam: state.body.sortParam 
                }
                need = 'logs'
                reducers.push(changePage(1,id))
            }else if(state.type==='Circle_Diagram'){
                specialObject={
                    fieldName: state.body.field,
                    //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                    fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                    getState().acs.dashboards.filters[state.body.indexName][state.body.field]:
                    state.body.paramFilter[state.body.field]
                    // fieldList: ["Детский садик 'вишенка'", "Крематорий 'барбекью'"]
                }
                need = 'Circle_Diagram'
            }
            let reqObj = {
                need,
                indexName,
                "timeFilter": {
                    from: startDate.format('YYYY/MM/DD HH:mm:ss'),
                    to:  endDate.format('YYYY/MM/DD HH:mm:ss'),
                },
                "paramsFilter": state.body.paramFilter,
                dashType: state.type,
                specialObject
                      
            }
            // console.log('acs-form-processor.php')
            uniThunk(reqObj,reducers,dispatch,id)
        }

}

// uploads,timeFilter,filter,showedLogs,page
export const setParamFilterThunk = (filter,dbName,indexName,id) => {
    // console.log(filter)
    let filterCopy = {}
    for (let param in filter) {
        if(filter[param].length!==0) filterCopy[param] = filter[param]
    }
    delete filterCopy.opened
    return (dispatch,getState) => {
        let state = getState().acs.dashboards.dashboards[id]
        let  specialObject = {}
        let reducers = [ParamFilter(filterCopy,id)]
        let need
        if(state.type==='Table') {
            specialObject={
                logsCount: state.body.pagination.showedLogs,
                curPage: 1,
                sortParam: state.body.sortParam 
            }
            need = 'logs'
            reducers.push(changePage(1,id))
        }else if(state.type==='Circle_Diagram'){
            specialObject={
                fieldName: state.body.field,
                //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                getState().acs.dashboards.filters[state.body.indexName][state.body.field]:
                state.body.paramFilter[state.body.field]
                // fieldList: ["Детский садик 'вишенка'", "Крематорий 'барбекью'"]
            }
            need = 'Circle_Diagram'
        }
        let timeFilter = prepareTimefilter(getState,dbName,state,indexName)
        // if(state.body.uploads.uploads){
        //     timeFilter = {
        //         from: getFromDate(state.body.uploads.from_number,state.body.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
        //         to:  state.body.uploads.to
        //     }
        // }
        // else{
        //     timeFilter = {
        //         from: state.body.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
        //         to:  state.body.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
        //     }
        // }
        
        let  reqObj={
                need,
                indexName,
                timeFilter,
                "paramsFilter": filterCopy,
                specialObject,
                dashType: state.type
            };
            uniThunk(reqObj,reducers,dispatch,id)          
    }
}

export const changeSortThunk = (sortParam,indexName,id,dashField) => {
    return (dispatch,getState) => {
        let state = getState().acs.dashboards.dashboards[id]
        let timeFilter,NewSortParam,specialObject = {}
        if(state.body.uploads.uploads){
            timeFilter = {
                // from: 'now-'+state.uploads.from_number+state.uploads.from_time_type+'/'+state.uploads.from_time_type,
                from: getFromDate(state.body.uploads.from_number,state.body.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
                to:  state.body.uploads.to
            }
        }else{
            timeFilter = {
                from: state.body.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  state.body.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        }
        if(sortParam.field===state.body.sortParam.field){
            NewSortParam = {...state.body.sortParam}
            NewSortParam.direction=NewSortParam.direction==='asc'?'desc':'asc'
        }else{
            NewSortParam = {
                type: sortParam.type,
                field: sortParam.field,
                direction: 'asc'
            }
        }
        if(state.type==='Table') {
            specialObject={
                logsCount: state.body.pagination.showedLogs,
                curPage: state.body.pagination.currentPage,
                sortParam: NewSortParam
            }
        }else if(state.type==='Circle_Diagram'){
            specialObject={
                field: dashField
            }
        }
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            "paramsFilter": state.body.paramFilter,
            specialObject,
            dashType: state.type

        }
        uniThunk(reqObj,[changeSortParam(sortParam,id)],dispatch,id)
    }
}

export const onSaveDashParamsThunk = (id) => {
    return (dispatch,getState) => {
        let state = getState().acs.dashboards.dashboards[id]
        let {timeFilter,paramFilter,uploads,indexName,field} = state.body
        timeFilter = {
                from: timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
        }
        console.log(timeFilter)
        const reqObj = {
            "need": "changeDash",
            id,
            change: {timeFilter, paramFilter, uploads, field},
            login: getState().auth.briefUserInfo.name,
            indexName
        }
        uniThunk(reqObj,[],dispatch)
    }
}

const uniThunk = (reqObj,dispatches,dispatch, id) => {
    // console.log(reqObj)
    axios.post("php/acs-form-processor.php", reqObj).then(response => {
        // console.log(response)
        let json = JSON.parse(response.request.response);
        console.log(json)
        if(reqObj['need']==='logs') dispatch(uploadAcs(json, reqObj, id))
        if(reqObj['need']==='dashboards') dispatch(uploadDashboards(json))
        if(reqObj['need']==='Circle_Diagram') dispatch(uploadCircleDiagram(json,id))
        dispatches.forEach(obj => dispatch(obj))
    }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });;
}

export const onCreatePdfThunk = () => {
    console.log('pdf')
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
    return (dispatch,getState) => {
        let auth = getState().auth
        if(auth.isAuth){
            
            let reqObj = {
                "need": "dashboards",
                login: auth.briefUserInfo.name
            }
            uniThunk(reqObj,[],dispatch)
        }else return dummy
    }
}

export default acsReducer;