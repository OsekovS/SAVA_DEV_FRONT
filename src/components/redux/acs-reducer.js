import * as axios from 'axios'
import moment from "moment"

const DEL_ENDP = 'DEL_ACS_ENDP';
const DEL_OBJ = 'DEL_ACS_OBJ';
const ADD_ENDP = 'ADD_ACS_ENDP'
const ADD_OBJ = 'ADD_ACS_OBJ';
const CHANGE_MODE = 'CHANGE_ACS_MODE'
const UPLOAD_ACS = 'UPLOAD_ACS'
const CHANGE_TIME = 'CHANGE_TIME'

let initialState = function(){
    let now = new Date()
    let toDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
    let fromDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0))).subtract(1, "days")
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
                xLabels : ['xz','e','x']
            },
            bar2: {series: [{
                data: [13, 17, 19]           
                }],
                xLabels : ['xz','e','x']
            },
            timeFilter: {
                from: fromDate,
                to: toDate
            }
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
                // console.log(stateCopy.logs.bar.series)
            }
                return stateCopy
        case CHANGE_TIME:
            console.log(moment(action.startDate).format('YYYY/MM/DD HH:MM:SS')) //"2019/12/16 14:00:00 YYYY/MM/DD HH:MM:SS
            stateCopy = {...state};
            stateCopy.logs.timeFilter.from = moment(action.startDate)
            stateCopy.logs.timeFilter.to = moment(action.endDate)
            getAcs({"need": "logs",
            "timeFilter": {from: stateCopy.logs.timeFilter.from.format('YYYY/MM/DD HH:MM:SS'),
            to:   stateCopy.logs.timeFilter.to.format('YYYY/MM/DD HH:MM:SS')
            }})
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

export const getAcs = (reqObj) => {
    console.log(reqObj)
    // if(reqObj.need==='logs'){
    //     reqObj = {...reqObj, timeFilter: {} } 
    // }
    return (dispatch) => {
        // console.log('acs-form-processor.php')
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            // console.log(response)
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

export const SetTimeFilter = (startDate, endDate) => {

        console.log('!!!!!!!!!!')
     
    return (dispatch) => {
        dispatch(TimeFilter(startDate, endDate));
        let reqObj = {"need": "logs",
        "timeFilter": {from:  moment(startDate).format('YYYY/MM/DD HH:MM:SS'),
        to: moment(endDate).format('YYYY/MM/DD HH:MM:SS')
        }
    }
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

export default acsReducer;