import * as axios from 'axios'

const ADD_CAM = 'ADD_CAM';
const ADD_OBJ = 'ADD_OBJ';
const ADD_REG = 'ADD_REG';
const DEL_CAM = 'DEL_CAM';
const DEL_REG = 'DEL_REG';
const DEL_OBJ ='DEL_OBJ'
const CHANGE_MODE = 'CHANGE_CAM_MODE'
const UPLOAD_CAMS = 'UPLOAD_CAMS'

let initialState = {
    settings: {
    mode: 'view',
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

let translator = {
    'addObj': {
        tb_name: 'object',
        field_len: 1,
        uni_type: 'name',
        uni_type_usr: 'именем'
    },
    'addReg': {
        tb_name: 'registrators',
        field_len: 6,
        uni_type: 'ip',
        uni_type_usr: 'ip'
    },
    'addCam': {
        tb_name: 'cameras',
        field_len: 6,
        uni_type: 'ip',
        uni_type_usr: 'ip'
    },
}
// {type, obj_num, ip, name, login, password, password_rep}
const camerasReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
        case ADD_CAM:
            console.log(action)
            let new_cam = {
                id: (action.id).toString(),
                object: action.obj,
                name: action.name, 
                ip: action.ip, 
                login: action.login, 
            };   
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.cameras.push(new_cam);
            stateCopy.settings.mode = 'view'
            return stateCopy;
        case DEL_CAM:
            console.log(action.id)
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            stateCopy.settings.cameras = state.settings.cameras.filter(e => e.id!==action.id)
            return stateCopy
       case ADD_OBJ:
            // console.log('camAjaxik')
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
            stateCopy.settings.cameras = state.settings.cameras.filter(e => e.object!==action.name)
            stateCopy.settings.registrators = state.settings.registrators.filter(e => e.object!==action.name)
            return stateCopy
       case ADD_REG:
            console.log(action)
            let new_reg = {
                id: (action.id).toString(),
                object: action.obj,
                name: action.name, 
                ip: action.ip, 
                login: action.login, 
            };      
            stateCopy = {...state};
            stateCopy.settings = {...state.settings};
            // stateCopy.settings.registrators = state.settings.registrators.map((e) => e);
            console.log(state.settings.registrators)
            stateCopy.settings.registrators.push(new_reg);
            console.log(stateCopy.settings.registrators)
            stateCopy.settings.mode = 'view'
            
            return stateCopy;
        case DEL_REG:
                console.log(action.ip)
                stateCopy = {...state};
                stateCopy.settings = {...state.settings};
                stateCopy.settings.registrators = state.settings.registrators.filter(e => e.id!==action.id)
                return stateCopy
        case CHANGE_MODE:
                stateCopy = {...state};
                stateCopy.settings = {...state.settings};
                stateCopy.settings.mode = action.mode
                console.log(stateCopy)
                return stateCopy
        case UPLOAD_CAMS:
                stateCopy = {...state};
                if(action['need']==='settings'){
                    stateCopy.settings.cameras = action.json.cameras.map( (e) => ({
                        id: e[0],
                        object: e[2],
                        name: e[1],
                        ip: e[3],
                        login: e[4]
                    }))
                    stateCopy.settings.registrators = action.json.registrators.map( (e) => ({
                        id: e[0],
                        object: e[2],
                        name: e[1],
                        ip: e[3],
                        login: e[4]
                    }))
                    stateCopy.settings.objects = action.json.object.map( (e) => ({
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

export const addCam = ({ id, ip, name, login, pass, obj }) =>
    ({type: ADD_CAM, id, ip, name, login, pass, obj })

export const addReg = ({ id, ip, name, login, pass, obj }) =>{
    // console.log({ id, ip_reg, name, login, pass, obj })
    return {type: ADD_REG, id, ip, name, login, pass, obj }
}
export const addObj = ({id, name}) =>
({ type: ADD_OBJ, id, name})

export const delCam = (id) =>
({ type: DEL_CAM, id: id })

export const delReg = (id) =>
({ type: DEL_REG, id: id })

export const delObj = (id,name) =>
({ type: DEL_OBJ, id, name })

export const changeMode = (mode) =>
({ type: CHANGE_MODE, mode: mode })

export const uploadCameras = (json,reqObj) =>
({ type: UPLOAD_CAMS, json, need: reqObj.need })

export const getCameras = (reqObj) => {
    console.log(reqObj)
    return (dispatch) => {
        console.log('cameras-form-processor.php')
        axios.post("php/cameras-form-processor.php", reqObj).then(response => {
            console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(uploadCameras(json,reqObj));
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
    
    if(Object.values(reqObj.form).length === translator[reqObj.mode].field_len){
            if(reqObj.form.pass===reqObj.form.pass_rep){
                delete reqObj.form.pass_rep
                // reqObj.obj = state.settings.cameras.objects[reqObj.obj]
                return (dispatch) => {
                    let json={form: reqObj.form, addField: {uni_type: translator[reqObj.mode].uni_type, uni_val: reqObj.form[translator[reqObj.mode].uni_type], tb_name: translator[reqObj.mode].tb_name}}
                    // console.log(json)
                    axios.post("php/cameras-form-processor.php",json).then(response => {
                        // console.log(response)
                        json = JSON.parse(response.request.response);
                        // console.log(json)
                        if(json.result==="done")
                            switch (reqObj.mode) {
                                case 'addObj':
                                    return   dispatch(addObj({...reqObj.form, id: json.id}));
                                case 'addReg':
                                    return   dispatch(addReg({...reqObj.form, id: json.id}));
                                case 'addCam':

                                    return   dispatch(addCam({...reqObj.form, id: json.id}));
                                default:
                                    return {type: ''};
                            }
                        else alert(`Пользователь с таким ${translator[reqObj.mode].uni_type_usr} уже существует`)
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

export const delFieldThunk = (reqObj) => {
    console.log(reqObj)
        return (dispatch) => {
            let json = {tb_name: reqObj.delete, id: reqObj.id, objName: reqObj.objName, delete: true}
            // console.log(json)
            axios.post("php/cameras-form-processor.php",json).then(response => {
                // console.log(response)
                json = JSON.parse(response.request.response);
                // console.log(json)
                if(json.result==="done")
                    switch (reqObj.delete) {
                        case 'cameras':
                            return   dispatch(delCam(reqObj.id));
                        case 'registrators':
                            return   dispatch(delReg(reqObj.id));
                        case 'object':
                            // return getCameras({"need": "settings"})
                            // return {type: ''};
                            return   dispatch(delObj(reqObj.id, reqObj.objName));
                        default:
                            return {type: ''};
                    }
                else alert("При удалении возникла ошибка")
            }).catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        }

}

export default camerasReducer;