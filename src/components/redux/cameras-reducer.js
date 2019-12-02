import { addUseActionCreator } from "./users-reducer";

const ADD_CAM = 'ADD_CAM';
const ADD_OBJ = 'ADD_OBJ';
const ADD_REG = 'ADD_REG';

let initialState = {
    settings: {
    objects: [
        {numb: '1', name: 'Санаторий Звенигород'},
        {numb: '2', name: 'Больница №46'},
        {numb: '3', name: 'Детский сад "Яблочко"'},
        {numb: '4', name: 'Офис'}],
    cameras: [
        {
        object: 'Санаторий Звенигород',
        name: 'Холл',
        ip: '121.41.41.22',
        login: 'admin'
        },
    {
        object: 'Больница №46',
        name: 'Процедурная',
        ip: '192.168.1.177',
        login: 'admin'
    },
    {
        object: 'Детский сад "Яблочко"',
        name: 'Корридор 2 этаж',
        ip: '111.231.211.112',
        login: 'admin'
    },
    {
        object: 'Санаторий Звенигород',
        name: 'Рецепшен',
        ip: '666.231.211.112',
        login: 'admin'
    }],
    registrators: [
        {
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
       case ADD_OBJ:
            console.log('camAjaxik')
            stateCopy = {...state};
            stateCopy.settings = {...state.settings}
            stateCopy.settings.objects = [...state.settings.objects, 
                {numb: state.settings.objects.length ,name: action.obj_name}]
            return stateCopy;
       case ADD_REG:
            console.log('camAjaxik')
            if(action.obj_num === undefined) action.obj_num = 1;
            let new_reg = {
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


export default camerasReducer;