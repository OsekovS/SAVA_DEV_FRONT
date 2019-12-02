import { addUseActionCreator } from "./users-reducer";

const ADD_CAM = 'ADD_CAM';
const ADD_OBJ = 'ADD_OBJ';
const ADD_REG = 'ADD_REG';
const DEL_CAM = 'DEL_CAM';
const DEL_REG = 'DEL_REG';
const DEL_OBJ ='DEL_OBJ'

let initialState = {
    settings: {
    objects: [
        {id: '0', name: 'Санаторий Звенигород'},
        {id: '1', name: 'Больница №46'},
        {id: '2', name: 'Детский сад "Яблочко"'},
        {id: '3', name: 'Офис'}
    ],
    cameras: [
        {
        id: '0',
        object: 'Санаторий Звенигород',
        name: 'Холл',
        ip: '121.41.41.22',
        login: 'admin',
        },
    {
        id: '1',
        object: 'Больница №46',
        name: 'Процедурная',
        ip: '192.168.1.177',
        login: 'admin'
    },
    {
        id: '2',
        object: 'Детский сад "Яблочко"',
        name: 'Корридор 2 этаж',
        ip: '111.231.211.112',
        login: 'admin'
    },
    {
        id: '3',
        object: 'Санаторий Звенигород',
        name: 'Рецепшен',
        ip: '666.231.211.112',
        login: 'admin'
    }],
    registrators: [
        {
            id: '4',
            object: 'Санаторий Звенигород',
            name: 'ZZZ',
            ip: '661.6661.41.22',
            login: 'admin'
        },
    ]},
    logs: 
    [{
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
        "param":"2019-11-06 12:50:52"
    },
    {
        "time":"2019\/11\/06 12:53:11",
        "ip_cam":"192.168.3.109",
        "type":"Event",
        "comment":"Motion detect",
        "param":"2019-11-06 12:51:37"
    }]
};
// {type, obj_num, ip, name, login, password, password_rep}
const camerasReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
        case ADD_CAM:
            console.log('camAjaxik')
            if(action.obj_num === undefined) action.obj_num = 1;
            let new_cam = {
                id: state.settings.cameras.length,
                obj_num: state.settings.objects[action.obj_num-1].name,
                ip: action.ip, 
                name: action.name, 
                login: action.login, 
                
            };      
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.cameras = state.settings.cameras.map((e) => e);
            stateCopy.settings.cameras.push(new_cam);;
            return stateCopy;
        case DEL_CAM:
            console.log(action.id)
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.cameras = state.settings.cameras.filter(e => e.id!==action.id)
            return stateCopy
       case ADD_OBJ:
            console.log('camAjaxik')
            stateCopy = {...state};
            stateCopy.settings = {...state.settings}
            stateCopy.settings.objects = [...state.settings.objects, 
                {id: state.settings.objects.length ,name: action.obj_name}]
            return stateCopy;
        case DEL_OBJ:
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.objects = state.settings.objects.filter(e => e.id!==action.id)
            return stateCopy
       case ADD_REG:
            console.log('camAjaxik')
            if(action.obj_num === undefined) action.obj_num = 1;
            let new_reg = {
                id: state.settings.registrators.length,
                obj_num: state.settings.objects[action.obj_num-1].name,
                ip: action.ip, 
                name: action.name, 
                login: action.login, 
                
            };      
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.registrators = state.settings.registrators.map((e) => e);
            stateCopy.settings.registrators.push(new_reg);

            return stateCopy;
        case DEL_REG:
                console.log(action.ip)
                stateCopy = {...state};
                stateCopy.settings = {...state.settings};
                stateCopy.settings.registrators = state.settings.registrators.filter(e => e.id!==action.id)
                return stateCopy
       default:
           return state;
   }
}

export const addCamCreator = ({obj_num, ip, name, login, password, password_rep}) =>
    ({ type: ADD_CAM, obj_num: obj_num, ip: ip, name: name, login: login, password: password, password_rep: password_rep })

export const addRegCreator = ({obj_num, ip, name, login, password, password_rep}) =>
({ type: ADD_REG, obj_num: obj_num, ip: ip, name: name, login: login, password: password, password_rep: password_rep })

export const addObjCreator = ({obj_name}) =>
({ type: ADD_OBJ, obj_name: obj_name })

export const delCamCreator = (id) =>
({ type: DEL_CAM, id: id })

export const delRegCreator = (id) =>
({ type: DEL_REG, id: id })

export const delObjCreator = (id) =>
({ type: DEL_OBJ, id: id })



export default camerasReducer;