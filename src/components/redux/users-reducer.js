import { stat } from "fs";
import { isArray } from "util";
import * as axios from 'axios'

const ADD_USER = 'ADD_USER';
const DEL_USER = 'DEL_USER'
const TOG_FECH = 'TOG_FECH'
const UPLOAD_USERS = 'UPLOAD_USERS'


let initialState = 
           {
               users:  [{id: '0', name: 'admin', admin: true},
               { id: '1', name: 'user1', admin: false,},
               { id: '2', name: 'admin1', admin: true,},
               { id: '3', name: 'admin2', admin: true,},
               { id: '4', name: 'user2', admin: false,}],
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
                id: state.length,
                name: action.login,
                admin:    action.admin === undefined ? false : action.admin
            };        
            stateCopy ={...state}
            stateCopy.users = [...state.users,newUser]
            console.log(state)
            console.log(stateCopy)
            return stateCopy;
        case DEL_USER:
            console.log(action.id)
            stateCopy ={...state}
            stateCopy.users= state.users.filter(e => e.id!==action.id)
            return stateCopy
        case TOG_FECH:
                stateCopy ={...state}
                stateCopy.isFetching = action.status
            return stateCopy
        case UPLOAD_USERS:
                stateCopy ={...state}
                stateCopy.users = action.usernames.map( (e) => ({
                    id: e[0],
                    name: e[1],
                    admin:    e[2] !== ''
                }))
                return stateCopy
       default:
           return state;
   }
}

export const toggleIsFetching = (bool) => ({type: TOG_FECH, status: bool })

export const delUser = (id) => ({type: DEL_USER, id: id })


export const addUser = ({login, password_rep, password, admin}) =>
    ({ type: ADD_USER, login: login, password_rep: password_rep, password: password, admin: admin})

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
    return (dispatch) => {
    axios.post("php/users-form-processor.php",{delField: id}).then(response => {
        console.log(response)
        let json = JSON.parse(response.request.response);
        if(json.result==="done")
            dispatch(delUser(id));
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

export const addUserThunk = (user) => {
    console.log(user)
    if(user.admin === undefined)
        user.admin = false
    if(Object.values(user).length === 4){
            if(user.password===user.password_rep){
                    return (dispatch) => {
                axios.post("php/users-form-processor.php",{addField: user,
                    _login: user.login,
                    _password: user.password,
                    _admin: user.admin
                }).then(response => {
                    console.log(response)
                    let json = JSON.parse(response.request.response);
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