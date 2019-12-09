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
               isFetching: false
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
                    id: e[1],
                    name: e[0],
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

export const uploadUser = (users) => ({type: UPLOAD_USERS, users: users })

export const getUsersThunk = () => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        console.log('!!!')
        axios.get("users-form-processor.php").then(response => {
            dispatch(toggleIsFetching(false));
            let json = JSON.parse(response);
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
    axios.post("users-form-processor.php",{delUser: id}).then(response => {
        let json = JSON.parse(response);
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

export const addUserThunk = (user) => {
    if(user.admin === undefined)
        user.admin = false
    if(Object.values(user).length === 4){
        return (dispatch) => {
        axios.post("users-form-processor.php",{addUser: user}).then(response => {
            let json = JSON.parse(response);
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
        alert("Необходимо заполнить все поля")
        return {type: '' }
    }
}


export default usersReducer;