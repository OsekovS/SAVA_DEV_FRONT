import * as axios from 'axios'
import moment from "moment"
import {acsIni} from './IniStates.js'
import {getCookie} from '../JS/Cookies'
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
            if(body.timeFilter!==undefined){
                let toDate = moment(new Date(body.timeFilter.to))
                let fromDate = moment(new Date(body.timeFilter.from))
                    body.timeFilter= {
                        from: fromDate,
                        to: toDate
                    }
            }
            body.pdf=body.saver=body.markAsRead='wait'
            stateCopy[action.dbName][dash[0]] = {
                id: dash[0],
                name: dash[1],
                type: dash[2],
                body: body,
                 
            }
            if(body.type==='Table') 
                stateCopy[action.dbName][dash[0]].search_after = {head:[0,'0']}
        });
        console.log(stateCopy[action.dbName])
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
        return stateCopy
        case 'DEL_DASH':
            stateCopy=  acsIni().dashboards
            return stateCopy
       case 'UPLOAD_CIRCLE_DIAGRAM':
            console.log(action)
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.logs = {...state[action.dbName][action.id].body.logs}
            stateCopy[action.dbName][action.id].body.logs = action.json.logs
            return stateCopy
        case 'UPLOAD_BAR_DIAGRAM':
            console.log(action)
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].body.logs = [...state[action.dbName][action.id].body.logs]
            stateCopy[action.dbName][action.id].body.logs = action.json.logs.map((e)=>{
            return {
                date: new Date(e.date),
                doc_count: e.doc_count
            }})
            return stateCopy
        case 'UPLOAD_ACS_DASHBOARDS':
            let {oldPage, curPage} = action.specialObject
            // console.log(action)
            // console.log(curPage)
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body

            // if(action.id==='8') stateCopyShort.logs = oldPage<curPage||!oldPage?action.json.logs.map( (e) => e._source):action.json.logs.map( (e) => e._source).reverse()
            // else stateCopyShort.logs = action.json.logs.map( (e) => e._source)
            stateCopyShort.logs = oldPage<curPage||!oldPage?action.json.logs.map( (e) => e._source):action.json.logs.map( (e) => e._source).reverse()

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
            console.log(state)
            console.log(action)
            stateCopy = getDashBody(state,action)
            let copyData = {...action.filter}
            for (const key in copyData) {
                if (copyData.hasOwnProperty(key)&&copyData[key]===undefined||copyData[key].length===0) {
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
            stateCopy[action.dbName][action.id].body.curLog = stateCopy[action.dbName][action.id].body.curLog === action.number?null:action.number
            return stateCopy
        case 'CHANGE_MAIN_FIELD':
            console.log(action)
            console.log(state)
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
           
             stateCopyShort.paramFilter = {... state[action.dbName][action.id].body.paramFilter}
            //убираем старый paramFilter
            // delete  stateCopyShort.paramFilter[ stateCopyShort.field]
             stateCopyShort.field = action.value
             console.log(stateCopy)
            return stateCopy
        case 'CHANGE_MAIN_FIELD_LIST':
            stateCopy = getDashBody(state,action)
            stateCopyShort = stateCopy[action.dbName][action.id].body
            stateCopyShort.paramFilter = {... state[action.dbName][action.id].body.paramFilter}        
            stateCopyShort.paramFilter[stateCopyShort.field] = action.list 
            return stateCopy
        case 'CHANGE_DASH_SEARCH_AFTER_PARAM':{
            console.log(action)
            // let {newTail, newHead} = 
            // let {oldPage, curPage} = action.sendedObj
            stateCopy = getDashBody(state,action)

            // stateCopy[action.dbName][action.id].search_after = {...action.search_after}
            // в es нельзя отправлять строки с символом "/" поэтому мы его заменяем на //
            // console.log(action.search_after.head[0])
            stateCopy[action.dbName][action.id].search_after = {
                tail: typeof(action.search_after.tail)==="string"?action.search_after.tail.replace( /\//g, "//" ):action.search_after.tail,
                head: typeof(action.search_after.head)==="string"?action.search_after.head.replace( /\//g, "//" ):action.search_after.head
            }
            return stateCopy
        }
        case 'CHANGE_DASH_SEARCH_AFTER_DOP_PARAM':{
            stateCopy = getDashBody(state,action)
            console.log(action)
            stateCopy[action.dbName][action.id].search_after_dop = {
                tail: typeof(action.search_after.tail)==="string"?action.search_after.tail.replace( /\//g, "//" ):action.search_after.tail,
                head: typeof(action.search_after.head)==="string"?action.search_after.head.replace( /\//g, "//" ):action.search_after.head
            }
            // console.log(stateCopy[action.dbName][action.id].search_after.head[0])
            return stateCopy
        }
        case 'CHANGE_DASH_SIZE':{
            stateCopy = getDashBody(state,action)
            
            stateCopyShort = stateCopy[action.dbName][action.id].body
            let {changeDir, minVal,delta} = action
            // console.log(stateCopyShort.style.height)
            console.log(action)
            changeDir.forEach((e,n) => {
                stateCopyShort.style[e] = (stateCopyShort.style[e]>stateCopyShort.style[minVal[n]]) || action.delta>0?
                stateCopyShort.style[e] + delta:stateCopyShort.style[e]
            });

            // if(action.changeDir==='Vertical') {
            //     stateCopyShort.style.height = (stateCopyShort.style.height>stateCopyShort.style.minHeight) || action.delta>0?
            //     stateCopyShort.style.height + action.delta:stateCopyShort.style.height
            // }
            // else {
            //     stateCopyShort.style.width = stateCopyShort.style.width>stateCopyShort.style.minWidth || action.delta>0?
            //     stateCopyShort.style.width + action.delta:stateCopyShort.style.width
            // }
            // console.log(stateCopyShort.style.height)
            return stateCopy
        }
        case 'CHANGE_DASH_NAME':{
            stateCopy = getDashBody(state,action)
            stateCopy[action.dbName][action.id].name = action.newName
            return stateCopy
        }
        case 'CHANGE_COLLAPSE_MODE':{
            // console.log(action)
            stateCopy = getDashBody(state,action)
            // console.log(stateCopy[action.dbName][action.id])
            stateCopy[action.dbName][action.id].body = {... state[action.dbName][action.id].body}  
            stateCopy[action.dbName][action.id].body.collapsed = action.collapse
            
            return stateCopy
        }
        case 'CHANGE_HEADER_ELEM_SIZE':{
            console.log(action)
            stateCopy = getDashBody(state,action)
            // console.log(stateCopy[action.dbName][action.id])
            stateCopy[action.dbName][action.id].body = {... state[action.dbName][action.id].body}  
            stateCopy[action.dbName][action.id].body.headerElements = 
                state[action.dbName][action.id].body.headerElements.map((e,n) => {
                    if(action.num === n) e.colWidth = parseInt(action.width)
                    return e
                })
                console.log(stateCopy[action.dbName][action.id].body.headerElements)
            return stateCopy
        }
        case 'CHANGE_VIEWED_FIELDS': {
            console.log(action)
            stateCopy = getDashBody(state,action)
            // console.log(stateCopy[action.dbName][action.id])
            stateCopy[action.dbName][action.id].body = {... state[action.dbName][action.id].body}  
            stateCopy[action.dbName][action.id].body[action.field] = []
            action.content.forEach((elem)=>{
                stateCopy[action.dbName][action.id].body.indexElements.forEach((indexElement)=>{
                    if(indexElement.field===elem) stateCopy[action.dbName][action.id].body[action.field].push(indexElement)
                })
            })
            // stateCopy[action.dbName][action.id].body.indexElements.forEach(element => {
            //     if(element.field === action.field)
            //         stateCopy[action.dbName][action.id].body.footerElements.push(element)
            // }); 
            return stateCopy;
        }
        case 'CHANGE_HEADER_ELEM_POSITION': {
            let temp //template for change
            stateCopy = getDashBody(state,action)
            // console.log(stateCopy[action.dbName][action.id])
            stateCopy[action.dbName][action.id].body = {... state[action.dbName][action.id].body} 
            stateCopy[action.dbName][action.id].body.headerElements = [... state[action.dbName][action.id].body.headerElements]   
            if(action.direction === 'left') {
               temp = stateCopy[action.dbName][action.id].body.headerElements[action.num]
               stateCopy[action.dbName][action.id].body.headerElements[action.num] = stateCopy[action.dbName][action.id].body.headerElements[action.num - 1]
               stateCopy[action.dbName][action.id].body.headerElements[action.num - 1] = temp
            }else{
                temp = stateCopy[action.dbName][action.id].body.headerElements[action.num]
                stateCopy[action.dbName][action.id].body.headerElements[action.num] = stateCopy[action.dbName][action.id].body.headerElements[action.num + 1]
                stateCopy[action.dbName][action.id].body.headerElements[action.num + 1] = temp
             }
             
            return stateCopy;
        }
        case 'SHIFT_DASH':{
            console.log(action)
            let tempDash //template for change
            stateCopy = getDashBody(state,action)
            tempDash = stateCopy[action.dbName][action.id]
            stateCopy[action.dbName][action.id] = stateCopy[action.dbName][action.siblingId]
            stateCopy[action.dbName][action.id].id = action.id
            stateCopy[action.dbName][action.siblingId] = tempDash
            stateCopy[action.dbName][action.siblingId].id = action.siblingId
            return stateCopy;
        }
       default:
           return state;
   }
}

export const changeHeaderElemSize = (num,width,id,dbName) =>({type: 'CHANGE_HEADER_ELEM_SIZE', num,width,id,dbName})
export const changeHeaderElemPos = (num,id,dbName,direction) =>({type: 'CHANGE_HEADER_ELEM_POSITION', num,id,dbName,direction})

export const clearDash = () => ({type: 'DEL_DASH'})

export const TimeFilter = (startDate, endDate,id,dbName) =>
({type: 'CHANGE_TIME', startDate, endDate,id,dbName})

export const uploadAcs = (json,reqObj,id,dbName) =>
({ type: 'UPLOAD_ACS_DASHBOARDS', json, specialObject: reqObj.specialObject, id,dbName })

export const ParamFilter = (filter,id,dbName) =>
({type: 'CHANGE_PARAM_FILTER', filter,id,dbName})

export const onChangeCurrentLog = (number,id,dbName) =>
({type: 'CHANGE_CURRENT_LOG', number,id,dbName})

export const changePage = (page,id,dbName) =>
({type: 'CHANGE_PAGE', page,id,dbName})

const uploadCircleDiagram = (json,id,dbName) =>
({type: 'UPLOAD_CIRCLE_DIAGRAM' ,json, id,dbName})
const uploadBarDiagram = (json,id,dbName) =>
({type: 'UPLOAD_BAR_DIAGRAM' ,json, id,dbName})
export const changeDashSize = (delta,id,dbName,changeDir,minVal) => ({type: 'CHANGE_DASH_SIZE' ,delta, id,dbName,changeDir,minVal})



export const changeDashName = (newName,id,dbName) => ({ type: 'CHANGE_DASH_NAME', newName,id,dbName})

export const changeUploads = (uploads,id,dbName) => ({ type: 'CHANGE_UPLOAD', uploads,id,dbName})
export const changeUpdatesParams = (params,id,dbName) => ({ type: 'CHANGE_UPLOAD_PARAMS', params,id,dbName})
export const changeShowedLogs = (showedLogs,id,dbName) => ({ type: 'CHANGE_SHOWED_LOGS', showedLogs,id,dbName})
export const changeSortParam = (sortParam,id,dbName) => ({ type: 'CHANGE_SORT_PARAM', sortParam,id,dbName})

export const uploadDashboards = (dbName,json) => ({type: 'UPLOAD_DASHBOARDS',dbName, json})
export const addDashboard = (dbName,json) => ({type: 'ADD_DASHBOARDS',dbName, json})
export const delDashboard = (dbName,json) => ({type: 'DEL_DASHBOARDS',dbName, json})


export const changeViewedFields = (content, field,id,dbName) => ({type: 'CHANGE_VIEWED_FIELDS',content, field,id,dbName})

export const shiftDash = (id, siblingId, dbName, direction) => ({ type: 'SHIFT_DASH', id, siblingId, dbName, direction})
export const changeMainField = (value,id,dbName) => ({ type: 'CHANGE_MAIN_FIELD', value,id,dbName})
export const changeMainFieldList = (id,dbName,list) => { return    { type: 'CHANGE_MAIN_FIELD_LIST', list,id,dbName}  }  

export const changeDashSearchAfterParam = (id, sendedObj, search_after, dbName) => { return    { type: 'CHANGE_DASH_SEARCH_AFTER_PARAM', id, sendedObj, search_after, dbName}  }  
// CHANGE_DASH_SEARCH_AFTER_PARAM

export const changeDashSearchAfterDopParam = (id, sendedObj, search_after, dbName) => { return    { type: 'CHANGE_DASH_SEARCH_AFTER_DOP_PARAM', id, sendedObj, search_after, dbName}  }  
// getState,dbName,state,indexName  ...args
export const changeCollapseMode = (id,dbName,collapse) => { return    { type: 'CHANGE_COLLAPSE_MODE', id, dbName, collapse}  }  

const  prepareTimefilter = (getState,dbName,state,indexName)=>{
    // console.log(args)
    if(state.body.uploads.uploads){
        let lastViewed = getState().auth.briefUserInfo.modules[dbName].indexes[indexName].lastViewed
        return {
            from: (moment(new Date()).subtract(lastViewed.fromNum, lastViewed.fromLetter)).format('YYYY/MM/DD HH:mm:ss'),//getFromDate(state.body.uploads.from_number,state.body.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),
            to:  state.body.uploads.to
        }
    }else{
        return {
            from: state.body.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
            to:  state.body.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
        }
    }  
  }
export const onDashShiftThunk = (id, indexName, dbName, direction) => {
    return (dispatch,getState) => {
        console.log(id)
        let siblingId, dashboards = getState().dashboards[dbName]
        console.log(dashboards)
        let reactCounter = 0, reactShifredCounter = 0
        if(direction === 'left'){ 
            for (const key in dashboards) {
                if (dashboards.hasOwnProperty(key)) {
                    if(dashboards[key].id == id) {
                        reactCounter = key
                        break;
                    }
                    else if(dbName==='sava_core' || dashboards[key].body.indexName === indexName) {
                        reactShifredCounter = key
                        siblingId = dashboards[key].id
                    }
                }
            }
        }
        else {
            let flag = false
            for (const key in dashboards) {
                if (dashboards.hasOwnProperty(key) && (dbName==='sava_core' || dashboards[key].body.indexName === indexName)) {
                    if(dashboards[key].id === id) {
                        reactCounter = key
                        flag = true;
                    }
                    else if(flag){
                        reactShifredCounter = key
                        siblingId = dashboards[key].id
                        break;
                    }
                }
            }
        }
        let reqObj={
            need:"shiftDash",
            indexName,
            direction,
            shiftedId: id,
            siblingId,
            dbName,
            login: getCookie('login')
        }
        //{type:''}
        uniThunk(reqObj,[shiftDash(reactCounter, reactShifredCounter, dbName, direction)],
            dispatch,id,dbName)
    }
}
//
const determDbName = (dbName, retField)=>(typeof dbName==='object'?retField:dbName);

export const onClearThunk = (indexName, timeFilter, paramsFilter, password) => {
    // console.log(args)
    
    return (dispatch,getState) => {
        let reqObj={
            need: "logsClear",
            indexName,
            paramsFilter,
            timeFilter:{
                from: timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            },
            password,
            login: getCookie('login')
        }
        // console.log(reqObj)
        // dispatch({type:''})
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            // console.log(reqObj)
            // console.log(response.request.response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            
            if(json.result === 'passwErr') alert('Неверно введенный пароль')
            else if(json.result === 'success') alert(json.amount + ' записей успешно удалены')
            else alert('Ошибка при удалении')
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
    }
}
export const getAcs = (id,indexName,dbName,isFirst) => {
    return (dispatch,getState) => {
        // if(typeof dbName==='object')  dbName = dbName.name
        let state = getState().dashboards[determDbName(dbName,'sava_core')][id], dispatches = []
        let specialObject = {},
            need, timeFilter;
        if(state.body.timeFilter!==undefined) timeFilter = prepareTimefilter(getState,determDbName(dbName,dbName.name),state,indexName)
        if(state.type==='Table') {
            specialObject={
                logsCount: state.body.pagination.showedLogs,//9,
                curPage: state.body.pagination.currentPage,
                sortParam: {...state.body.sortParam},
                id
            }
            specialObject.search_after =state.body.sortParam.direction=='desc'?'first':['0','0']// [0, "0"]//state.search_after.head    
            specialObject.idSort = 'asc'
            need = "logs_pretty"
        }else if(state.type==='Circle_Diagram'){
            specialObject={
                fieldName: state.body.field,
                //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                fieldList: (Object.keys(state.body.paramFilter).length===0||state.body.paramFilter[state.body.field]===undefined)?
                getState().auth.briefUserInfo.modules[determDbName(dbName,dbName.name)].indexes[indexName].filter[state.body.field]:
                state.body.paramFilter[state.body.field]
            }
            need = 'Circle_Diagram'
        }else if(state.type==='Bar_Diagram'){
            specialObject={
                barsCount: state.body.barsCount,
                calendar_interval: state.body.calendar_interval,
                order: state.body.order
            }
            need = 'Bar_Diagram'
        }
        console.log(state.type)
        console.log(specialObject)
        let paramFilter = {...state.body.paramFilter}
        paramFilter[state.body.field] = (Object.keys(state.body.paramFilter).length===0||state.body.paramFilter[state.body.field]===undefined)?
        getState().auth.briefUserInfo.modules[determDbName(dbName,dbName.name)].indexes[indexName].filter[state.body.field]:
        state.body.paramFilter[state.body.field]
        let changeFilObj = getState().changeDashFromMenu
        if((state.type==='Table') && (state.body.indexName==changeFilObj.indexName))  {
            paramFilter.significance = changeFilObj.filter.significance
            dispatches.push(ParamFilter(paramFilter,id,determDbName(dbName,dbName.name)))
        }
        delete paramFilter[undefined]
        // if(state.type==='Circle_Diagram') delete paramFilter[state.body.field]
        // isChangeFilter: Object.keys(changeFilObj).length>0?changeFilObj:false}
        let reqObj={
            need,
            indexName:state.body.indexName,
            timeFilter,
            paramsFilter: paramFilter,
            dashType: state.type,
            specialObject,
            changePage: isFirst
        }
        if(state.type==='Table') console.log(reqObj.paramsFilter.length)
            uniThunk(reqObj,dispatches,dispatch,id,determDbName(dbName,'sava_core'))
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

export const addDashBoardThunk = (indexName,dbName,mainField,name) => {
    // console.log(indexName)
    // console.log(dbName)
    // console.log(mainField)
    return (dispatch,getState) => {
        
                let reqObj = {
                    "need": "addDashboard",
                    dbName,
                    indexName,
                    mainField,
                    name,
                    login: getState().auth.briefUserInfo.name,
                }
                uniThunk(reqObj,[],dispatch)
    }
}

export const changeMainFieldThunk = (newMainField,dbName,indexName,id) => {
    return (dispatch,getState) => {
        let state = getState().dashboards[determDbName(dbName,'sava_core')][id]
        let timeFilter = prepareTimefilter(getState,determDbName(dbName,dbName.name),state,indexName)
        let filterCopy = {...state.body.paramFilter}
        let specialObject={
            fieldName: newMainField,
            //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
            fieldList: (Object.keys(state.body.paramFilter).length===0||state.body.paramFilter[newMainField]===undefined)?
            getState().auth.briefUserInfo.modules[determDbName(dbName,dbName.name)].indexes[indexName].filter[newMainField]:
            state.body.paramFilter[newMainField]
        }
        
        let paramFilter = state.body.paramFilter

        delete filterCopy[newMainField]
                let reqObj = {
                    "need": "Circle_Diagram",
                    indexName,
                    timeFilter,
                    "paramsFilter": paramFilter,
                    dashType: state.type,
                    specialObject
                }
                uniThunk(reqObj,[changeMainField(newMainField,id,determDbName(dbName,'sava_core'))],dispatch,id,determDbName(dbName,'sava_core'))
    }
}

export const changeUploadModeThunk = (uploadMode,indexName,id) => {
    console.log(':(')
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
                    sortParam: {...state.body.sortParam},

                    search_after: [0,'0'],
                    idSort: 'asc',
                    
                }
                reducers.push(changePage(1,id))
        }
        let reqObj = {
            // "need": "logs",
            "need": "logs_pretty",
            indexName,
            timeFilter,
            "paramsFilter": state.body.paramFilter,
            dashType: state.type,
            specialObject
        }
        reqObj.specialObject.sortParam.direction = 'asc'
        uniThunk(reqObj,reducers,dispatch,id)
    }
}

export const changeUploadsThunk = (uploads,id,indexName,dbName) => {
    return (dispatch,getState) => {
        let from = moment(new Date()).subtract(uploads.fromNum, uploads.fromLetter).format('YYYY/MM/DD HH:mm:ss')
        // let from = getState().auth.briefUserInfo.modules[dbName].indexes[indexName].lastViewed
        let reducers = [changeUpdatesParams(uploads,id,determDbName(dbName,'sava_core')),
            changeUploads(true,id,determDbName(dbName,'sava_core'))]
        let state = getState().dashboards[determDbName(dbName,'sava_core')][id]
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
                sortParam: {...state.body.sortParam}, 

                search_after: [0,'0'],
                idSort: 'asc',
            }
            // need = 'logs'

            need = "logs_pretty"
            specialObject.sortParam.direction = 'asc'

            reducers.push(changePage(1,id,determDbName(dbName,'sava_core')))
            reducers.push(changeDashSearchAfterParam(id, specialObject, {head: [0,'0']}, determDbName(dbName,'sava_core')))
        }else if(state.type==='Circle_Diagram'){
            console.log(state.body)
            specialObject={
                fieldName: state.body.field,
                //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                getState().auth.briefUserInfo.modules[determDbName(dbName,dbName.name)].indexes[indexName].filter[state.body.field]:
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
            specialObject,
            changePage:state.type==='Table'?true:undefined,
        }
        // console.log(reqObj)
        uniThunk(reqObj,reducers,dispatch,id,determDbName(dbName,'sava_core'))

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
            changePage: true,
            specialObject: {
                logsCount: showedLogs,
                curPage: 1,//state.pagination.currentPage
                oldPage: undefined,
                sortParam: {...state.body.sortParam},
                id
            }
        }
        // в случае с полем время условия должны быть особенными
        let {type,field,direction} = state.body.sortParam
        if( type === "date" && field == "time" && direction == "asc") {
            reqObj.specialObject.search_after = [0,'0']
            reqObj.specialObject.sortParam.direction = 'asc'
        } else {
            reqObj.specialObject.search_after = 'first'
        }
            reqObj.specialObject.idSort = 'asc'

            reqObj.need = "logs_pretty"
       console.log(reqObj)
        uniThunk(reqObj,[changeShowedLogs(showedLogs,id,dbName),changePage(1,id,dbName)],dispatch,id,dbName)
    }
}

export const changePageThunk = (page,indexName,id,dbName) => {
    return (dispatch, getState) => {
        let state = getState().dashboards[dbName][id]
        console.log(state.body.uploads.uploads)
        let curPage = state.body.pagination.currentPage,
        timeFilter = prepareTimefilter(getState,dbName,state,indexName),
        reqObj = {
            "need": "logs",
            indexName,
            "timeFilter": timeFilter,
            "paramsFilter": state.body.paramFilter,
            dashType: state.type,
            changePage: true,
            specialObject: {
                logsCount: state.body.pagination.showedLogs,//9,
                curPage: page,
                oldPage: curPage,
                sortParam: {...state.body.sortParam},
                id
            }
        }
        console.log(page-curPage)
        //id на 3 строки выше
        // if(id==8) {
            // учесть что юзер может клакнуть на текущую страницу
            //
            if(curPage<page){

                reqObj.specialObject.search_after = state.body.uploads.uploads?state.search_after_dop.head:state.search_after.head
                // в зависимости от того какой параметр сортировки 
                if(state.body.sortParam.direction==='asc'){

                    reqObj.specialObject.sortParam.direction = 'asc'
                }else{

                    reqObj.specialObject.sortParam.direction = 'desc'
                }
                reqObj.specialObject.idSort = 'asc'

                
            }else if(curPage==page){
                return({type:''})
            }else{
                if(state.body.sortParam.direction==='asc'){
                    reqObj.specialObject.sortParam.direction = 'desc'
                }else{
                    reqObj.specialObject.sortParam.direction = 'asc'
                }
                reqObj.specialObject.search_after =  state.body.uploads.uploads?state.search_after_dop.tail:state.search_after.tail
                reqObj.specialObject.idSort = 'desc'
                
            }

            reqObj.need = "logs_pretty"
        // }
        uniThunk(reqObj,[changePage(page,id,dbName)],dispatch,id,dbName)
    }
} 

export const setTimeFilterThunk = (startDate, endDate,indexName,id,dbName) => {
        return (dispatch, getState) => {
            console.log(determDbName(dbName,'sava_core'))
            console.log(dbName)
            let state = getState().dashboards[determDbName(dbName,'sava_core')][id]
            let specialObject = {}
            let reducers = [TimeFilter(startDate, endDate,id,determDbName(dbName,'sava_core')),changeUploads(false,id,determDbName(dbName,'sava_core'))]
            let need
            if(state.type==='Table') {
                specialObject={
                    logsCount: state.body.pagination.showedLogs,
                    curPage: 1,
                    sortParam: {...state.body.sortParam},
                    oldPage: undefined,
                    id
                }
                need = 'logs'
            // if(id==8) {
                specialObject.search_after = [0,'0']
                specialObject.idSort = 'asc'
                specialObject.sortParam.direction = 'asc'
                need = "logs_pretty"
            // }
                reducers.push(changePage(1,id,determDbName(dbName,'sava_core')))
                // reducers.push(changeDashSearchAfterParam(id, specialObject, state.search_after_dop, dbName))
            }else if(state.type==='Circle_Diagram'){
                specialObject={
                    fieldName: state.body.field,
                    //если фильтр дашборда пустой либо же в этом фильтре нет ничего по нужному параметру - ищем по всем иначе берем что нужно прямо в фильтре
                    fieldList: (state.body.paramFilter===[]||state.body.paramFilter[state.body.field]===undefined)?
                    getState().auth.briefUserInfo.modules[determDbName(dbName,dbName.name)].indexes[indexName].filter[state.body.field]:
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
                specialObject,
                changePage: true,
            }
            // console.log('acs-form-processor.php')
            uniThunk(reqObj,reducers,dispatch,id,determDbName(dbName,'sava_core'))
        }

}
export const setComplexSetThunkFromMain = (filter,dbName,indexName,id,newFrom) => {
    let dispatches =[],uploadsCopy
    console.log(newFrom)
    return (dispatch,getState) => {
        Object.values(getState().dashboards[dbName]).forEach(element => {
            if(element.type==='Table' && element.body.indexName==indexName) {
                id = element.id
                dispatches.push(ParamFilter(filter,id,dbName))
                if(element.body.uploads.uploads) {
                    dispatches.push(changeUploads(false,id,dbName))
                }
                dispatches.push(TimeFilter(moment(newFrom), moment(Date.now()),id,dbName))
                
            }
            // dispatch({type:null})//s
        });
        return dispatches.forEach(obj => dispatch(obj))
    }
}
// uploads,timeFilter,filter,showedLogs,page
export const setParamFilterThunk = (filter,dbName,indexName,id) => {
    let filterCopy = {}, timeFilter
    for (let param in filter) {
        if(filter[param]!==undefined&&filter[param].length!==0) filterCopy[param] = filter[param]
    }
    console.log(filterCopy)
    return (dispatch,getState) => {
       
        let state = getState().dashboards[determDbName(dbName,'sava_core')][id]
        
        let  specialObject = {}
        let reducers = [ParamFilter(filter,id,determDbName(dbName,'sava_core'))]
        let need
        
        if(state.type==='Table') {
            specialObject={
                logsCount: state.body.pagination.showedLogs,
                curPage: 1,
                sortParam: {...state.body.sortParam},
                oldPage: undefined,
                id
            }
            specialObject.search_after = [0,'0']
            specialObject.idSort = 'asc'
            specialObject.sortParam.direction = 'asc'
            need = "logs_pretty"
            reducers.push(changePage(1,id,determDbName(dbName,'sava_core')))
        }else if(state.type==='Circle_Diagram'){
            let mainField = state.body.field
            specialObject={
                fieldName: state.body.field,
            }
            need = 'Circle_Diagram'
        }else if(state.type==='Bar_Diagram'){
            specialObject={
                barsCount: state.body.barsCount,
                calendar_interval: state.body.calendar_interval,
                order: state.body.order
            }
            need = 'Bar_Diagram'
        }
        if(state.body.timeFilter!==undefined) timeFilter = prepareTimefilter(getState,determDbName(dbName,dbName.name),state,indexName)
        let  reqObj={
                need,
                indexName,
                timeFilter,
                "paramsFilter": filterCopy,
                specialObject,
                dashType: state.type
            };
            uniThunk(reqObj,reducers,dispatch,id,determDbName(dbName,'sava_core'))          
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
                curPage: 1,//state.body.pagination.currentPage,
                sortParam: NewSortParam,
                id
            }
  
        let reqObj = {
            "need": "logs",
            indexName,
            timeFilter,
            "paramsFilter": state.body.paramFilter,
            specialObject,
            dashType: state.type,
            oldPage: undefined,
            changePage: true

        }
        // if(id==8) {
            // specialObject.search_after = 'first'
            specialObject.search_after = NewSortParam.direction=='desc'?'first':['0','0']
            specialObject.idSort = 'asc'
            reqObj.need = "logs_pretty"
        // }
        uniThunk(reqObj,[changeSortParam(sortParam,id,dbName),changePage(1,id,dbName)],dispatch,id,dbName)
    }
}
// 31
export const onSaveDashParamsThunk = (id,dbName) => {
    return (dispatch,getState) => {
        let state = getState().dashboards[determDbName(dbName,'sava_core')][id]
        let {timeFilter,paramFilter,uploads,indexName,field,style,footerElements,headerElements} = state.body
        if(timeFilter!==undefined) timeFilter = {
                from: timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to:  timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            }
        // Object.values(paramFilter).forEach(element => {
        //     console.log(element)
        // });
        
        const reqObj = {
            "need": "changeDash",
            id,
            change: {timeFilter, paramFilter, uploads, field, style,footerElements,headerElements},
            login: getState().auth.briefUserInfo.name,
            indexName,
            dbName: determDbName(dbName,'sava_core')
        }
        
        uniThunk(reqObj,[],dispatch,determDbName(dbName,'sava_core'))
    }
}

export const onChangeDashNameThunk = (newName,id,dbName) => {
    console.log(newName,id,dbName)
    return (dispatch,getState) => {
        const reqObj = {
            "need": "changeDashName",
            id,
            dbName,
            newName,
            login: getCookie('login')
        }
        uniThunk(reqObj,[changeDashName(newName,id,dbName)],dispatch,dbName)
    }
}

const uniThunk = (reqObj,dispatches,dispatch, id,dbName) => {

    if(reqObj['need']==='logs_pretty') console.log(reqObj.paramsFilter.length)
    axios.post("php/acs-form-processor.php", reqObj).then(response => {
        // console.log(reqObj)
        // console.log(response.request.response)
        let json = JSON.parse(response.request.response);
        console.log(json)
        
        if(reqObj['need']==='logs') dispatch(uploadAcs(json, reqObj, id,dbName))
        if(reqObj['need']==='dashboards') dispatch(uploadDashboards(reqObj.dbName,json,reqObj.need))
        if(reqObj['need']==='addDashboard') dispatch(addDashboard(reqObj.dbName,json,reqObj.need))
        if(reqObj['need']==='delDashboard') dispatch(delDashboard(reqObj.dbName,json,reqObj.need))
        if(reqObj['need']==='Circle_Diagram') dispatch(uploadCircleDiagram(json,id,dbName))
        if(reqObj['need']==='Bar_Diagram') dispatch(uploadBarDiagram(json,id,dbName))
        if(reqObj['need']==='logs_pretty') {
            if(reqObj.timeFilter.to==='now/d'&&reqObj.changePage) dispatch(changeDashSearchAfterDopParam(id, reqObj.specialObject, json.search_after, dbName))
            else if(reqObj.changePage) dispatch(changeDashSearchAfterParam(id, reqObj.specialObject, json.search_after, dbName))
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
export const createReportThunk = (state, indexName, field) => {
    return (dispatch,getState) => {
        let obj, {mode, timeFilter, params, mainField, title, trend, fieldsInTable} = state
        // console.log(fieldsInTable)
        if(mode==='pdf'){
            obj = {operation: "create PDF",params:[{}]}
            obj.params[0].timerange = {
                "starttime": timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                "endtime": timeFilter.to.format('YYYY/MM/DD HH:mm:ss')
            }
            obj.params[0].filter = params
            obj.params[0].grouping = {
                "name": "по объектам",
                "argument": mainField
            }
            obj.params[0].type = title
            obj.params[0].indexName = indexName
        }else{
            // console.log(title)
            obj = {
                operation:"create EXCEL",
                params:{
                    paramstable:[
                            {
                                timerange:{
                                    starttime: timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                                    endtime: timeFilter.to.format('YYYY/MM/DD HH:mm:ss')
                                },
                                filter: params,//params,//{person:["Артем Артишев"]},
                                field:fieldsInTable,//:["object","pass_number","time","route","person","significance","event","ip_device","device"],
                                
                                grouping:{field: mainField, trend:trend?'asc':'desc'},//{field:"time",trend:"asc"},
                                pagename: title,//,e"Отчет с 16.04.2019"
                                indexname: indexName//"acs_castle_ep2_event"
                            }
                        ],
                            filename:  title,//,e"Отчет с 16.04.2019"
                        }
                    }
        }

        let reqObj={
            str:JSON.stringify(obj)
        }
        // console.log(reqObj)
        // this.setState({clickButtonText: 'ожидайте окончания создания отчета..'});
        // axios.get(`php/upload-file.php`);
        axios.post("php/make-file.php", reqObj).then(response => {
            // this.setState({clickButtonText: "Сотворить pdf"});
            console.log(response.request.response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.python === "OK") {
                const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            // console.log('resolution='+(mode==='pdf'?'pdf':'excel'))
            link.setAttribute('href', 'php/upload-file.php?resolution='+(mode==='pdf'?'pdf':'excel'+'&filename='+title))
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            }
            else{
                alert("Ошибка генерации отчета...")
            }
           
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
          return dummy
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

export const  getDashboardsThunk = (dbName) => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    return (dispatch,getState) => {
        let auth = getState().auth
        if(auth.isAuth){
            // let changeFilObj = getState().changeDashFromMenu
            // console.log(changeFilObj)
            let reqObj = {
                "need": "dashboards",
                login: auth.briefUserInfo.name,
                dbName
                // isChangeFilter: Object.keys(changeFilObj).length>0?changeFilObj:false
            }
            
            uniThunk(reqObj,[],dispatch,dbName,getState)
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
//  ...args
// function goUp(timeOut) {
//     var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
//     if(top > 0) {
//     window.scrollBy(0,-100);
//     timeOut = setTimeout('goUp()',20);
//     } else clearTimeout(timeOut);
// }

export const getAtClickOnCircleDiagram = (circleId,indexName,dbName,numbOfSector) => {
    
     return (dispatch,getState) => {
        let  dashInmodule = getState().dashboards[dbName],
          tableId
          //"прокручиваем" пользователя наверх
          window.scrollBy(0,-window.pageYOffset);

         for (let index = 0; index < Object.keys(dashInmodule).length; index++) {
            if(dashInmodule[index].type === "Table"&&dashInmodule[index].body.indexName === indexName) {
                tableId = dashInmodule[index].id
                break;
           }
        }
         
        let state = dashInmodule[tableId],
        {field, logs} = dashInmodule[circleId].body,
        timeFilter = prepareTimefilter(getState,dbName,dashInmodule[circleId],indexName)
         let   specialObject={
                 logsCount: state.body.pagination.showedLogs,//9,
                 curPage: state.body.pagination.currentPage,
                 sortParam: {...state.body.sortParam},
                 id: tableId
             },
             paramsFilter = Array.isArray(dashInmodule[circleId].body.paramFilter)? {}:{...dashInmodule[circleId].body.paramFilter}
            //  console.log(paramsFilter)
             paramsFilter[field] = [logs.labels[numbOfSector]]
        specialObject.search_after = [0,'0']
        specialObject.idSort = 'asc'
        specialObject.sortParam.direction = 'asc'
         let reqObj={
             need: "logs_pretty",
             indexName:state.body.indexName,
             timeFilter,
             paramsFilter, //{[field]: [logs.labels[numbOfSector]]},
             dashType: state.type,
             specialObject,
             changePage: true
         }
         let dispatches = [changePage(1,tableId,dbName),ParamFilter(paramsFilter,tableId,dbName),
         TimeFilter(moment(new Date(timeFilter.from)), (timeFilter.to==="now/d"?moment(Date.now()):
            moment(new Date(timeFilter.to))), tableId, dbName)]
         if(dashInmodule[circleId].body.uploads.uploads !== dashInmodule[tableId].body.uploads.uploads)
            dispatches.push(changeUploads(dashInmodule[circleId].body.uploads.uploads,tableId,dbName))
         if(dashInmodule[circleId].body.uploads.uploads) 
            dispatches.push(changeUpdatesParams({
                timeKind: dashInmodule[circleId].body.uploads.timeKind,
                timeNum: dashInmodule[circleId].body.uploads.timeNum
            },tableId,dbName))
         uniThunk(reqObj, dispatches, dispatch, tableId, dbName)
        //  return dummy
            //  
            // changeSortParam(sortParam,id,dbName),] 
            // ,changeUploads(body.uploads.uploads,id,dbName)
            //  changeUpdatesParams = (params,id,dbName) => ({ type: 'CHANGE_UPLOAD_PARAMS', params,id,dbName})
     }
 }



     
   


export default acsReducer;