import * as axios from 'axios'
import moment from "moment"
import {acsIni} from './IniStates.js'

const dummy = {type: ''}
let {dashboards} = acsIni()

const acsReducer = (state = dashboards, action) => {
    let stateCopy,stateCopyShort,stateShort
   switch (action.type) {
       case 'UPLOAD_DASHBOARDS':
        stateCopy = {...state};
        if(stateCopy===null)
        stateCopy={}
        stateCopy[action.dbName] = []
        console.log(action.json.dashboards)
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
            if(dash[0]==8) stateCopy[action.dbName][dash[0]].search_after = [0,'0']
        });
           return stateCopy
        case 'ADD_DASHBOARDS':
            stateCopy = {...state};
            stateCopy[action.dbName] = {...state[action.dbName]}
            console.log(action)
            let dash = action.json.dashboard
            let body = dash.json
            let toDate = moment(new Date(body.timeFilter.to))
            let fromDate = moment(new Date(body.timeFilter.from))
                body.timeFilter= {
                    from: fromDate,
                    to: toDate
                }
                body.pdf=body.saver=body.markAsRead='wait'
            stateCopy[action.dbName][dash.id]= {
                id: dash.id,
                name: dash.name,
                type: dash.type,
                body: body,
            }
               
            
        return stateCopy
        case 'DEL_DASHBOARDS':
            stateCopy = {...state};
            stateCopy[action.dbName] = {...state[action.dbName]}//.filter(dash => dash.id !== action.post.id);
            delete stateCopy[action.dbName][action.json.post.id]

            // action.json.dashboards.forEach(dash => {
            //     let body = JSON.parse(dash[4])   
            //     let toDate = moment(new Date(body.timeFilter.to))
            //     let fromDate = moment(new Date(body.timeFilter.from))
            //         body.timeFilter= {
            //             from: fromDate,
            //             to: toDate
            //         }
            //         body.pdf=body.saver=body.markAsRead='wait'
            //         stateCopy[action.dbName][dash[0]] = {
            //         id: dash[0],
            //         name: dash[1],
            //         type: dash[2],
            //         body: body,
            //     }
            // });
        return stateCopy
        case 'DEL_DASH':
            stateCopy=  acsIni().dashboards
            return stateCopy
       case 'UPLOAD_CIRCLE_DIAGRAM':
            if(action.json.logs.count[0]===null || action.json.logs.labels[0]===null) {
                console.log('NULL')
                return state
            }
            else{
                stateCopy = getDashBody(state,action)
            
                // if(action.json.logs)
                stateCopy[action.dbName][action.id].body.logs = {...state[action.dbName][action.id].body.logs}
                stateCopy[action.dbName][action.id].body.logs = action.json.logs
               return stateCopy
            }
        case 'UPLOAD_ACS_DASHBOARDS':
            console.log(state)
            console.log(action)
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateCopyShort.logs = action.json.logs.map( (e) => e._source)
            stateCopyShort.pagination = {...state[action.dbName][action.id].body.pagination}
            stateCopyShort.pagination.total = action.json.total
            stateCopyShort.pagination.lastPage = Math.ceil(action.json.total/stateCopyShort.pagination.showedLogs)
            // console.log(stateCopy[action.id])
            return stateCopy
        case 'CHANGE_TIME':
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateCopyShort.timeFilter = {... state[action.dbName][action.id].body.timeFilter}
            stateCopyShort.timeFilter.from = (action.startDate)
            stateCopyShort.timeFilter.to = (action.endDate)

            return stateCopy
        case 'CHANGE_PARAM_FILTER':
            stateCopy = getDashBody(state,action)
            let copyData = {...action.filter}
            for (const key in copyData) {
                if (copyData.hasOwnProperty(key)&&copyData[key].length===0) {
                    delete copyData[key]
                    
                }
            }
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

        case 'CHANGE_UPLOAD':
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateCopyShort.uploads = {... state[action.dbName][action.id].body.uploads}
            stateCopyShort.uploads.uploads = action.uploads
            return stateCopy
        case 'CHANGE_UPLOAD_PARAMS':
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateCopyShort.uploads = {... state[action.dbName][action.id].body.uploads}
            stateCopyShort.uploads.timeNum = action.params.timeNum
            stateCopyShort.uploads.timeKind = parseInt(action.params.timeKind)
            return stateCopy
        case 'CHANGE_PAGE':
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateShort = state[action.dbName][action.id].body
            stateCopyShort.pagination = {... stateShort.pagination}
            if(action.page===1)  stateCopyShort.pagination.fromPage = 1
            else{
                if(action.page=== stateShort.pagination.fromPage+ stateShort.pagination.showedPages-1 && action.page !==  stateShort.pagination.lastPage){
                     stateCopyShort.pagination.fromPage =  stateShort.pagination.fromPage +  stateShort.pagination.showedPages - 2
                }else if(action.page=== stateShort.pagination.lastPage){
                    if(Math.ceil( stateShort.pagination.total/ stateShort.pagination.showedLogs)< stateShort.pagination.showedPages)
                         stateCopyShort.pagination.fromPage =  stateShort.pagination.lastPage - Math.ceil( stateShort.pagination.total/ stateShort.pagination.showedLogs) + 1
                    else  stateCopyShort.pagination.fromPage =  stateShort.pagination.lastPage -  stateShort.pagination.showedPages + 1
                }else if(action.page=== stateShort.pagination.fromPage){
                    let fromPage = stateShort.pagination.fromPage -  stateShort.pagination.showedPages + 2
                    if(fromPage===0)  stateCopyShort.pagination.fromPage = 1
                    else   stateCopyShort.pagination.fromPage = fromPage
                }
            }
             stateCopyShort.pagination.currentPage = action.page
            return stateCopy
            
        case 'CHANGE_SHOWED_LOGS':
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateShort = state[action.dbName][action.id].body
            stateCopyShort.pagination = {... stateShort.pagination}
            for (let element of   stateShort.pagination.showedLogsList) {
                if (element===action.showedLogs) {
                     stateCopyShort.pagination.showedLogs = action.showedLogs
                     stateCopyShort.pagination.lastPage = Math.ceil( stateShort.pagination.total/action.showedLogs)
                     stateCopyShort.pagination.currentPage = 1
                     stateCopyShort.pagination.fromPage = 1
                    break;
                }
            }
            return stateCopy
        case 'CHANGE_SORT_PARAM':
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            if(action.sortParam.field=== state[action.dbName][action.id].body.sortParam.field){
                stateCopyShort.sortParam = {... state[action.dbName][action.id].body.sortParam}
                stateCopyShort.sortParam.direction= stateCopyShort.sortParam.direction==='asc'?'desc':'asc'
            }
            else{
                stateCopyShort.sortParam = {
                type: action.sortParam.type,
                field: action.sortParam.field,
                direction: 'asc'
                }
            }
            return stateCopy
        case 'CHANGE_CURRENT_LOG':
            stateCopy = getDashBody(state,action)
             stateCopy[action.dbName][action.id].body.curLog = action.number
            return stateCopy
        case 'CHANGE_MAIN_FIELD':
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateCopy = getDashBody(state,action)
             stateCopyShort.paramFilter = {... state[action.dbName][action.id].body.paramFilter}
            //убираем старый paramFilter
            delete  stateCopyShort.paramFilter[ stateCopyShort.field]
             stateCopyShort.field = action.value
            return stateCopy
        case 'CHANGE_MAIN_FIELD_LIST':
            console.log(action)
            console.log(state)
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateCopyShort.paramFilter = {... state[action.dbName][action.id].body.paramFilter}        
            stateCopyShort.paramFilter[stateCopyShort.field] = action.list 
            console.log(stateCopy)   
            return stateCopy
        case 'CHANGE_DASH_SEARCH_AFTER_PARAM':
            console.log(action)
            
            stateCopy = getDashBody(state,action)
            console.log(stateCopy)
            stateCopy[action.dbName][action.id].search_after = action.search_after
            
            return stateCopy
       default:
           return state;
   }
}
 


export const clearDash = () => ({type: 'DEL_DASH'})

export const TimeFilter = (startDate, endDate,id,dbName) =>
({type: 'CHANGE_TIME', startDate, endDate,id,dbName})

export const uploadAcs = (json,reqObj,id,dbName) =>
({ type: 'UPLOAD_ACS_DASHBOARDS', json, need: reqObj.need, id,dbName })

export const ParamFilter = (filter,id,dbName) =>
({type: 'CHANGE_PARAM_FILTER', filter,id,dbName})

export const onChangeCurrentLog = (number,id,dbName) =>
({type: 'CHANGE_CURRENT_LOG', number,id,dbName})

export const changePage = (page,id,dbName) =>
({type: 'CHANGE_PAGE', page,id,dbName})

const uploadCircleDiagram = (json,id,dbName) =>
({type: 'UPLOAD_CIRCLE_DIAGRAM' ,json, id,dbName})

export const changeUploads = (uploads,id,dbName) => ({ type: 'CHANGE_UPLOAD', uploads,id,dbName})
export const changeUpdatesParams = (params,id,dbName) => ({ type: 'CHANGE_UPLOAD_PARAMS', params,id,dbName})
export const changeShowedLogs = (showedLogs,id,dbName) => ({ type: 'CHANGE_SHOWED_LOGS', showedLogs,id,dbName})
export const changeSortParam = (sortParam,id,dbName) => ({ type: 'CHANGE_SORT_PARAM', sortParam,id,dbName})

export const uploadDashboards = (dbName,json) => ({type: 'UPLOAD_DASHBOARDS',dbName, json})
export const addDashboard = (dbName,json) => ({type: 'ADD_DASHBOARDS',dbName, json})
export const delDashboard = (dbName,json) => ({type: 'DEL_DASHBOARDS',dbName, json})

export const changeMainField = (value,id,dbName) => ({ type: 'CHANGE_MAIN_FIELD', value,id,dbName})
export const changeMainFieldList = (id,dbName,list) => { return    { type: 'CHANGE_MAIN_FIELD_LIST', list,id,dbName}  }  

export const changeDashSearchAfterParam = (id, search_after, dbName) => { return    { type: 'CHANGE_DASH_SEARCH_AFTER_PARAM', id, search_after, dbName}  }  
// CHANGE_DASH_SEARCH_AFTER_PARAM

const  prepareTimefilter = (getState,dbName,state,indexName)=>{
    if(state.body.uploads.uploads){
        return {
            from: getState().auth.briefUserInfo.modules[dbName].indexes[indexName].lastViewed,//getFromDate(state.body.uploads.from_number,state.body.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
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
                sortParam: state.body.sortParam,
                id
            }
            need = "logs"
            // console.log(id)
            if(id==8) {
                specialObject.search_after = state.search_after
                need = "logs_pretty"
            }
        }else if(state.type==='Circle_Diagram'){
            console.log(state.body)
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

export const onDashDeleteThunk = (id,dbName,indexName) => {
    return (dispatch,getState) => {
        let reqObj = {
            "need": "delDashboard",
            id,
            dbName,
            indexName,
            login: getState().auth.briefUserInfo.name,
        }
        uniThunk(reqObj,[],dispatch)
    }
}

export const addDashBoardThunk = (indexName,dbName,mainField) => {
    return (dispatch,getState) => {
        
                let reqObj = {
                    "need": "addDashboard",
                    dbName,
                    indexName,
                    mainField,
                    login: getState().auth.briefUserInfo.name,
                }
                uniThunk(reqObj,[],dispatch)
    }
}

export const changeMainFieldThunk = (newMainField,dbName,indexName,id) => {
    return (dispatch,getState) => {
        let state = getState().dashboards[dbName][id]
        let timeFilter = prepareTimefilter(getState,dbName,state,indexName)
        let filterCopy = {...state.body.paramFilter}
        let specialObject={
            fieldName: newMainField,
            //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
            fieldList: (Object.keys(state.body.paramFilter).length===0||state.body.paramFilter[newMainField]===undefined)?
            getState().auth.briefUserInfo.modules[dbName].indexes[indexName].filter[newMainField]:
            state.body.paramFilter[newMainField]
            // fieldList: ["Детский садик 'вишенка'", "Крематорий 'барбекью'"]
        }
        delete filterCopy[newMainField]
                let reqObj = {
                    "need": "Circle_Diagram",
                    indexName,
                    timeFilter,
                    "paramsFilter": filterCopy,
                    dashType: state.type,
                    specialObject
                }
                uniThunk(reqObj,[changeMainField(newMainField,id,dbName)],dispatch,id,dbName)
    }
}

export const changeUploadModeThunk = (uploadMode,indexName,id) => {
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
        let from = getState().auth.briefUserInfo.modules[dbName].indexes[indexName].lastViewed
        console.log(from)
        // console.log(getState().auth.briefUserInfo.modules[dbName])
        let reducers = [changeUpdatesParams(uploads,id,dbName),changeUploads(true,id,dbName)]
        let state = getState().dashboards[dbName][id]
        let timeFilter, specialObject = {}
            timeFilter = {
                from,
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
        console.log(state)
        let curPage = state.body.pagination.currentPage,
        timeFilter = prepareTimefilter(getState,dbName,state,indexName),
        reqObj = {
            "need": "logs",
            indexName,
            "timeFilter": timeFilter,
            "paramsFilter": state.body.paramFilter,
            dashType: state.type,
            specialObject: {
                logsCount: state.body.pagination.showedLogs,
                curPage: page,
                sortParam: state.body.sortParam,
                id
            }
        }
        console.log(page)
        console.log(curPage)
        //id на 3 строки выше
        if(id==8) {
            reqObj.specialObject.search_after = state.search_after
            reqObj.need = "logs_pretty"
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
    let filterCopy = {}
    for (let param in filter) {
        if(filter[param]!==undefined&&filter[param].length!==0) filterCopy[param] = filter[param]
    }
    console.log(filterCopy)
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
    console.log(dbName)

    axios.post("php/acs-form-processor.php", reqObj).then(response => {
        console.log(response)
        let json = JSON.parse(response.request.response);
        console.log(json)
        if(reqObj['need']==='logs') dispatch(uploadAcs(json, reqObj, id,dbName))
        if(reqObj['need']==='dashboards') dispatch(uploadDashboards(reqObj.dbName,json,reqObj.need))
        if(reqObj['need']==='addDashboard') dispatch(addDashboard(reqObj.dbName,json,reqObj.need))
        if(reqObj['need']==='delDashboard') dispatch(delDashboard(reqObj.dbName,json,reqObj.need))
        if(reqObj['need']==='Circle_Diagram') dispatch(uploadCircleDiagram(json,id,dbName))

        if(reqObj['need']==='logs_pretty') {
            dispatch(changeDashSearchAfterParam(id, json.search_after, dbName))
            dispatch(uploadAcs(json, reqObj, id,dbName))
        } 
        
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