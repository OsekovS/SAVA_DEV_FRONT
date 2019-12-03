const DEL_ENDP = 'DEL_ACS_ENDP';
const DEL_OBJ = 'DEL_ACS_OBJ';
const ADD_ENDP = 'ADD_ACS_ENDP'
const ADD_OBJ = 'ADD_ACS_OBJ'

let initialState = {
    settings: {
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
        "param":"2019-11-06 12:51:37"
    }]
};

const acsReducer = (state = initialState, action) => {
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
            console.log(stateCopy)
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
            return stateCopy;
       case DEL_OBJ:
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.objects = state.settings.objects.filter(e => e.id!==action.id)
            return stateCopy
       default:
           return state;
   }
}
 
export const delObjCreator = (id) => ({type: DEL_OBJ, id: id })

export const delEndpCreator = (id) =>
    ({ type: DEL_ENDP, id: id })

export const addEndpCreator = ({obj_num, ip, name, port, login, password, password_rep}) => (
    { type: ADD_ENDP, obj_num: obj_num, ip: ip, name: name, port: port, login: login, password: password, password_rep: password_rep })

export const addObjCreator = ({obj_name}) =>
({ type: ADD_OBJ, obj_name: obj_name })


export default acsReducer;