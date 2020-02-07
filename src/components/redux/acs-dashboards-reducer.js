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
const DEL_DASH = 'DEL_DASH'
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
        if(stateCopy===null)
        stateCopy={}
        stateCopy[action.dbName] = []
        // console.log(action.json.dashboards)
        action.json.dashboards.forEach(dash => {
            let body = JSON.parse(dash[4])   
            let toDate = moment(new Date(body.timeFilter.to))
            let fromDate = moment(new Date(body.timeFilter.from))
                body.timeFilter= {
                    from: fromDate,
                    to: toDate
                }
                body.pdf=body.saver=body.markAsRead='wait'
                stateCopy[action.dbName][dash[0]] = {
                id: dash[0],
                name: dash[1],
                type: dash[2],
                body: body,
            }
        });
           return stateCopy
        case DEL_DASH:
            stateCopy=  acsIni().dashboards
            return stateCopy
       case UPLOAD_CIRCLE_DIAGRAM:
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.logs = {...state[action.dbName][action.id].body.logs}
            stateCopy[action.dbName][action.id].body.logs = action.json.logs
           return stateCopy
        case UPLOAD_ACS_DASHBOARDS:
            // console.log(state)
            // console.log(action)
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.logs = action.json.logs.map( (e) => e._source)
            stateCopy[action.dbName][action.id].body.pagination = {...state[action.dbName][action.id].body.pagination}
            stateCopy[action.dbName][action.id].body.pagination.total = action.json.total
            stateCopy[action.dbName][action.id].body.pagination.lastPage = Math.ceil(action.json.total/stateCopy[action.dbName][action.id].body.pagination.showedLogs)
            // console.log(stateCopy[action.id])
            return stateCopy
        case CHANGE_TIME:
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.timeFilter = {... state[action.dbName][action.id].body.timeFilter}
            stateCopy[action.dbName][action.id].body.timeFilter.from = (action.startDate)
            stateCopy[action.dbName][action.id].body.timeFilter.to = (action.endDate)

            return stateCopy
        case CHANGE_PARAM_FILTER:
            stateCopy = getDashBody(state,action)
            let copyData = {...action.filter}
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
             stateCopy[action.dbName][action.id].body.paramFilter = copyData
            return stateCopy

        case CHANGE_UPLOAD:
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.uploads = {... state[action.dbName][action.id].body.uploads}
            stateCopy[action.dbName][action.id].body.uploads.uploads = action.uploads
            return stateCopy
        case CHANGE_UPLOAD_PARAMS:
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.uploads = {... state[action.dbName][action.id].body.uploads}
            stateCopy[action.dbName][action.id].body.uploads.timeNum = action.params.timeNum
            stateCopy[action.dbName][action.id].body.uploads.timeKind = parseInt(action.params.timeKind)
            stateCopy[action.dbName][action.id].body.uploads.from_number = action.params.from_number
            stateCopy[action.dbName][action.id].body.uploads.from_time_type = action.params.from_time_type
            return stateCopy
        case CHANGE_PAGE:
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.pagination = {... state[action.dbName][action.id].body.pagination}
            if(action.page===1)  stateCopy[action.dbName][action.id].body.pagination.fromPage = 1
            else{
                if(action.page=== state[action.dbName][action.id].body.pagination.fromPage+ state[action.dbName][action.id].body.pagination.showedPages-1 && action.page !==  state[action.dbName][action.id].body.pagination.lastPage){
                     stateCopy[action.dbName][action.id].body.pagination.fromPage =  state[action.dbName][action.id].body.pagination.fromPage +  state[action.dbName][action.id].body.pagination.showedPages - 2
                }else if(action.page=== state[action.dbName][action.id].body.pagination.lastPage){
                    if(Math.ceil( state[action.dbName][action.id].body.pagination.total/ state[action.dbName][action.id].body.pagination.showedLogs)< state[action.dbName][action.id].body.pagination.showedPages)
                         stateCopy[action.dbName][action.id].body.pagination.fromPage =  state[action.dbName][action.id].body.pagination.lastPage - Math.ceil( state[action.dbName][action.id].body.pagination.total/ state[action.dbName][action.id].body.pagination.showedLogs) + 1
                    else  stateCopy[action.dbName][action.id].body.pagination.fromPage =  state[action.dbName][action.id].body.pagination.lastPage -  state[action.dbName][action.id].body.pagination.showedPages + 1
                }else if(action.page=== state[action.dbName][action.id].body.pagination.fromPage){
                    let fromPage = state[action.dbName][action.id].body.pagination.fromPage -  state[action.dbName][action.id].body.pagination.showedPages + 2
                    if(fromPage===0)  stateCopy[action.dbName][action.id].body.pagination.fromPage = 1
                    else   stateCopy[action.dbName][action.id].body.pagination.fromPage = fromPage
                }
            }
             stateCopy[action.dbName][action.id].body.pagination.currentPage = action.page
            return stateCopy
            
        case CHANGE_SHOWED_LOGS:
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.pagination = {... state[action.dbName][action.id].body.pagination}
            for (let element of   state[action.dbName][action.id].body.pagination.showedLogsList) {
                if (element===action.showedLogs) {
                     stateCopy[action.dbName][action.id].body.pagination.showedLogs = action.showedLogs
                     stateCopy[action.dbName][action.id].body.pagination.lastPage = Math.ceil( state[action.dbName][action.id].body.pagination.total/action.showedLogs)
                     stateCopy[action.dbName][action.id].body.pagination.currentPage = 1
                     stateCopy[action.dbName][action.id].body.pagination.fromPage = 1
                    break;
                }
            }
            return stateCopy
        case CHANGE_SORT_PARAM:
            stateCopy = getDashBody(state,action)
            if(action.sortParam.field=== state[action.dbName][action.id].body.sortParam.field){
                stateCopy[action.dbName][action.id].body.sortParam = {... state[action.dbName][action.id].body.sortParam}
                stateCopy[action.dbName][action.id].body.sortParam.direction= stateCopy[action.dbName][action.id].body.sortParam.direction==='asc'?'desc':'asc'
            }
            else{
                stateCopy[action.dbName][action.id].body.sortParam = {
                type: action.sortParam.type,
                field: action.sortParam.field,
                direction: 'asc'
                }
            }
            return stateCopy
        case CHANGE_CURRENT_LOG:
            stateCopy = getDashBody(state,action)
             stateCopy[action.dbName][action.id].body.curLog = action.number
            return stateCopy
        case CHANGE_MAIN_FIELD:
            console.log('CHANGE_MAIN_FIELD')
            stateCopy = getDashBody(state,action)
             stateCopy[action.dbName][action.id].body.paramFilter = {... state[action.dbName][action.id].body.paramFilter}
            //убираем старый paramFilter
            delete  stateCopy[action.dbName][action.id].body.paramFilter[ stateCopy[action.dbName][action.id].body.field]
             stateCopy[action.dbName][action.id].body.field = action.value
            return stateCopy
        case CHANGE_MAIN_FIELD_LIST:
            console.log(action)
            console.log(state)
            stateCopy = getDashBody(state,action)
             stateCopy[action.dbName][action.id].body.paramFilter = {... state[action.dbName][action.id].body.paramFilter}        
             stateCopy[action.dbName][action.id].body.paramFilter[ stateCopy[action.dbName][action.id].body.field] = action.list 
             console.log(stateCopy)   
            return stateCopy
       default:
           return state;
   }
}
 


export const clearDash = () => ({type: DEL_DASH})

export const TimeFilter = (startDate, endDate,id,dbName) =>
({type: CHANGE_TIME, startDate, endDate,id,dbName})

export const uploadAcs = (json,reqObj,id,dbName) =>
({ type: UPLOAD_ACS_DASHBOARDS, json, need: reqObj.need, id,dbName })

export const ParamFilter = (filter,id,dbName) =>
({type: CHANGE_PARAM_FILTER, filter,id,dbName})

export const onChangeCurrentLog = (number,id,dbName) =>
({type: CHANGE_CURRENT_LOG, number,id,dbName})

export const changePage = (page,id,dbName) =>
({type: CHANGE_PAGE, page,id,dbName})

const uploadCircleDiagram = (json,id,dbName) =>
({type: UPLOAD_CIRCLE_DIAGRAM ,json, id,dbName})

export const changeUploads = (uploads,id,dbName) => ({ type: CHANGE_UPLOAD, uploads,id,dbName})
export const changeUpdatesParams = (params,id,dbName) => ({ type: CHANGE_UPLOAD_PARAMS, params,id,dbName})
export const changeShowedLogs = (showedLogs,id,dbName) => ({ type: CHANGE_SHOWED_LOGS, showedLogs,id,dbName})
export const changeSortParam = (sortParam,id,dbName) => ({ type: CHANGE_SORT_PARAM, sortParam,id,dbName})
export const uploadDashboards = (dbName,json) => ({type: UPLOAD_DASHBOARDS,dbName, json})
export const changeMainField = (value,id,dbName) => ({ type: CHANGE_MAIN_FIELD, value,id,dbName})
export const changeMainFieldList = (id,dbName,list) => {
    console.log('changeMainFieldList')
    return    { type: CHANGE_MAIN_FIELD_LIST, list,id,dbName}
    }  

const  prepareTimefilter = (getState,dbName,state,indexName)=>{
    
    const module = getState().auth.briefUserInfo.modules[dbName]
    // console.log(module)
    // console.log(dbName,state,indexName)
    
    if(module.mode==='lastViewed')  return {
        from: module.indexes[indexName].lastViewed,
         to:  state.body.uploads.to
    }
    else 
    if(state.body.uploads.uploads){
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
        let state = getState().dashboards[dbName][id]
        let specialObject = {}
        let need
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
                fieldList: (Object.keys(state.body.paramFilter).length===0||state.body.paramFilter[state.body.field]===undefined)?
                getState().auth.briefUserInfo.modules[dbName].indexes[indexName].filter[state.body.field]:
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
            uniThunk(reqObj,[],dispatch,id,dbName)
    }
}

export const ChangeMainFieldThunk = (indexName,id,keyState,dashField,dbName) => {
    return (dispatch,getState) => {
        let state = getState().dashboards[dbName][id]
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
                uniThunk(reqObj,[changeMainField(keyState)],dispatch,id,dbName)
    }
}
export const changeUploadModeThunk = (uploadMode,indexName,id) => {//,dbName////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //acs.dashboards.dashboards[dbName][id]
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
export const changeUploadsThunk = (uploads,id,indexName,dbName) => {//////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (dispatch,getState) => {
        let reducers = [changeUpdatesParams(uploads,id,dbName),changeUploads(true,id,dbName)]
        let state = getState().dashboards[dbName][id]
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
            reducers.push(changePage(1,id,dbName))
        }else if(state.type==='Circle_Diagram'){
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            specialObject={
                fieldName: state.body.field,
                //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                getState().auth.briefUserInfo.modules[dbName].indexes[indexName].filter[state.body.field]:
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
        uniThunk(reqObj,reducers,dispatch,id,dbName)
    }
}



export const changeShowedLogsThunk = (showedLogs,indexName,dbName,id) => {
    return (dispatch,getState) => {
        let state = getState().dashboards[dbName][id]
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
        uniThunk(reqObj,[changeShowedLogs(showedLogs,id,dbName),changePage(1,id,dbName)],dispatch,id,dbName)
    }
}

export const changePageThunk = (page,indexName,id,dbName) => {
    return (dispatch, getState) => {
        let state = getState().dashboards[dbName][id]       
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
        uniThunk(reqObj,[changePage(page,id,dbName)],dispatch,id,dbName)
    }
} 

export const setTimeFilterThunk = (startDate, endDate,indexName,id,dbName) => {
        return (dispatch, getState) => {
            let state = getState().dashboards[dbName][id]
            let specialObject = {}
            let reducers = [TimeFilter(startDate, endDate,id,dbName),changeUploads(false,id,dbName)]
            let need
            if(state.type==='Table') {
                specialObject={
                    logsCount: state.body.pagination.showedLogs,
                    curPage: 1,
                    sortParam: state.body.sortParam 
                }
                need = 'logs'
                reducers.push(changePage(1,id,dbName))
            }else if(state.type==='Circle_Diagram'){
                specialObject={
                    fieldName: state.body.field,
                    //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                    fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                    getState().auth.briefUserInfo.modules[dbName].indexes[indexName].filter[state.body.field]:
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
            uniThunk(reqObj,reducers,dispatch,id,dbName)
        }

}

// uploads,timeFilter,filter,showedLogs,page
export const setParamFilterThunk = (filter,dbName,indexName,id) => {
    // console.log(filter)
    let filterCopy = {}
    for (let param in filter) {
        if(filter[param].length!==0) filterCopy[param] = filter[param]
    }
    
    return (dispatch,getState) => {
        let state = getState().dashboards[dbName][id]
        
        let  specialObject = {}
        let reducers = [ParamFilter(filter,id,dbName)]
        let need
        
        if(state.type==='Table') {
            specialObject={
                logsCount: state.body.pagination.showedLogs,
                curPage: 1,
                sortParam: state.body.sortParam 
            }
            need = 'logs'
            reducers.push(changePage(1,id,dbName))
        }else if(state.type==='Circle_Diagram'){
            let mainField = state.body.field
            
            specialObject={
                fieldName: state.body.field,
                //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                fieldList: (filterCopy[mainField]===0||filterCopy[mainField]===undefined)?
                getState().auth.briefUserInfo.modules[dbName].indexes[indexName].filter[mainField]:
                filterCopy[mainField]
                // fieldList: ["Детский садик 'вишенка'", "Крематорий 'барбекью'"]
            }
            need = 'Circle_Diagram'
            delete filterCopy[mainField]
        }
        let timeFilter = prepareTimefilter(getState,dbName,state,indexName)
        
        let  reqObj={
                need,
                indexName,
                timeFilter,
                "paramsFilter": filterCopy,
                specialObject,
                dashType: state.type
            };
            uniThunk(reqObj,reducers,dispatch,id,dbName)          
    }
}

export const changeSortThunk = (sortParam,indexName,id,dbName) => {
    
    return (dispatch,getState) => {
        let state = getState().dashboards[dbName][id]
        let NewSortParam,specialObject = {}
        let timeFilter = prepareTimefilter(getState,dbName,state,indexName)
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
       
            specialObject={
                logsCount: state.body.pagination.showedLogs,
                curPage: state.body.pagination.currentPage,
                sortParam: NewSortParam
            }
  
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            "paramsFilter": state.body.paramFilter,
            specialObject,
            dashType: state.type

        }
        uniThunk(reqObj,[changeSortParam(sortParam,id,dbName)],dispatch,id,dbName)
    }
}

export const onSaveDashParamsThunk = (id,dbName) => {
    return (dispatch,getState) => {
        let state = getState().dashboards[dbName][id]
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
            indexName,
            dbName
        }
        uniThunk(reqObj,[],dispatch,dbName)
    }
}

const uniThunk = (reqObj,dispatches,dispatch, id,dbName) => {
    // console.log(reqObj)
    axios.post("php/acs-form-processor.php", reqObj).then(response => {
        // console.log(response)
        let json = JSON.parse(response.request.response);
        console.log(json)
        if(reqObj['need']==='logs') dispatch(uploadAcs(json, reqObj, id,dbName))
        if(reqObj['need']==='dashboards') dispatch(uploadDashboards(reqObj.dbName,json))
        if(reqObj['need']==='Circle_Diagram') dispatch(uploadCircleDiagram(json,id,dbName))
        dispatches.forEach(obj => dispatch(obj))
    }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });;
}

//href="upload-file.php?filename=file.pdf"
export const onCreatePdfThunk = () => {
    console.log('pdf')
    
    axios.post("php/upload-file.php").then(response => {
        // console.log(response)
        let json = JSON.parse(response.request.response);
        console.log(json)
        
    }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
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

export const  getDashboardsThunk = (dbName) => {
    return (dispatch,getState) => {
        let auth = getState().auth
        if(auth.isAuth){
            
            let reqObj = {
                "need": "dashboards",
                login: auth.briefUserInfo.name,
                dbName
            }
            uniThunk(reqObj,[],dispatch,dbName)
        }else return dummy
    }
}

const getDashBody = (state,action) => {
    let stateCopy = {...state};
    stateCopy[action.dbName] = {...state[action.dbName]}
    stateCopy[action.dbName][action.id] = {...state[action.dbName][action.id]}
    stateCopy[action.dbName][action.id].body = {...state[action.dbName][action.id].body}
    return stateCopy
}

export default acsReducer;