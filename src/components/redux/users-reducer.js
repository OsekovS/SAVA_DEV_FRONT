import { stat } from "fs";
import { isArray } from "util";
import * as axios from 'axios'

const ADD_USER = 'ADD_USER';
const DEL_USER = 'DEL_USER'
const TOG_FECH = 'TOG_FECH'
const UPLOAD_USERS = 'UPLOAD_USERS'


let initialState = 
           {
               users:  [{id: '0', name: 'admin', admin: true,modules:[1,2,3]}],
               isFetching: false,
                // mode: ''
           }
;

const usersReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
       case ADD_USER:
        console.log(action)
            let newUser = {
                id: state.users.length,
                name: action.login,
                admin:    action.admin === 'yes'?'да':'нет',
                modules:    action.modules,
            };        
            stateCopy ={...state}
            stateCopy.users = [...state.users,newUser]
            return stateCopy;
        case DEL_USER:
            stateCopy ={...state}
            console.log(state)
            console.log(action)
            // stateCopy.users ={...state.users}
            // stateCopy.users= state.users.filter(e =>{return e.id!==action.id})
            stateCopy.users = []
            state.users.forEach(e => {
                if(e.id!==action.id) stateCopy.users.push({...e})
            });
            return stateCopy
        case TOG_FECH:
                stateCopy ={...state}
                stateCopy.isFetching = action.status
            return stateCopy
        case UPLOAD_USERS:
                console.log('UPLOAD_USERS')
                stateCopy ={...state}
                let a = []
                stateCopy.users=[]
                console.log(action.usernames)
                action.usernames.forEach((e,n) => {
                    let modules = e[3]
                    modules = Object.keys(JSON.parse(e[3]))
                    // .toString()  .join()
                    
                    stateCopy.users.push({
                        id: e[0],
                        name: e[1],
                        admin:    (e[2] === 'yes'?'да':'нет'),
                        modules: modules
                    })
                });
                console.log(stateCopy.users)
                return stateCopy
       default:
           return state;
   }
}

export const toggleIsFetching = (bool) => ({type: TOG_FECH, status: bool })

export const delUser = (id) => ({type: DEL_USER, id: id })


export const addUser = ({login, modules, admin}) =>
    ({ type: ADD_USER, login: login, modules, admin})

export const uploadUser = (usernames) => ({type: UPLOAD_USERS, usernames})




export const getUsersThunk = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        console.log('!')
        
        axios.post("php/users-form-processor.php",{need: "user"}).then(response => {
            console.log(response.request)
            dispatch(toggleIsFetching(false));
            let json = JSON.parse(response.request.response);
            console.log(json)
            // dispatch({})
            dispatch(uploadUser(json.usernames));
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}

export const delUserThunk = (id) => {
    console.log(id)
    return (dispatch,getState) => {
    let briefUserInfo = getState().auth.briefUserInfo;
    let modules = briefUserInfo.modules
    let login = briefUserInfo.name
    axios.post("php/users-form-processor.php",{delField: {id,modules,login}}).then(response => {
        console.log(response)
        let json = JSON.parse(response.request.response);
        if(json.result==="done")
            dispatch(delUser(id.id));
        else alert("Не удалось удалить пользователя")
    }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }
}


export const changePassThunk = (formData,id) => {
    console.log(formData)
    console.log(id)
    return (dispatch) => {
        if(formData.password===formData.password_rep){
    axios.post("php/users-form-processor.php",{changePass: {id,formData}}).then(response => {
        console.log(response)
        let json = JSON.parse(response.request.response);
        console.log(json)
        if(json.result)
        alert("Пароль успешно изменен")
        else alert("Старый пароль был введен неверно")
    }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    }
    else alert("Поля 'Новый пароль' и 'Повторно введенный новый пароль' должны совпадать")
    }
}

export const addUserThunk = (user,modules) => {
    console.log(user)
    user.admin = user.admin?'yes':'no'
    if(Object.values(user).length >= 4){
            if(user.password===user.password_rep){
                    return (dispatch,getState) => {
                        modules = modules.length>0?modules:Object.keys(getState().auth.briefUserInfo.modules)
                        user.modules = modules
                        axios.post("php/users-form-processor.php",{addField: user,
                            _login: user.login,
                            _password: user.password,
                            _admin: user.admin,
                            _modules:modules
                        }).then(response => {
                            
                            let json = JSON.parse(response.request.response);
                            console.log(json)
                            if(json.result==="done")
                                dispatch(addUser(user));
                            else alert("Пользователь с таким id уже существует")
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



export default usersReducer;