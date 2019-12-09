import * as axios from 'axios'

const DEL_ENDP = 'DEL_ISS_ENDP';
const DEL_OBJ = 'DEL_ISS_OBJ';
const ADD_ENDP = 'ADD_ISS_ENDP'
const ADD_OBJ = 'ADD_ISS_OBJ'
const CHANGE_MODE = 'CHANGE_ISS_MODE'
const UPLOAD_ISS = 'UPLOAD_ISS'

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