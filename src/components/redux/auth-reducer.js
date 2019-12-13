import * as axios from 'axios'
import {setCookie,getCookie} from '../JS/Cookies'
const UPDATE_PAGE = "UPDATE_PAGE"
const LOG_IN = "LOG_IN"

const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    isAuth: false,
    briefUserInfo: {name: 'administrator',
    admin: 'администратор'}
};

const authReducer = (state = initialState, action) => {
   let stateCopy = state
    switch (action.type) {
       case LOG_IN:
            stateCopy = {...state}
            stateCopy.isAuth = true
            stateCopy.briefUserInfo.name = action.login
            stateCopy.briefUserInfo.admin = action.admin === "1" ? 'администратор' : 'оператор'
            setCookie("admin",action.admin)
            setCookie("hash",action.hash)
            setCookie("login",action.login)
           return stateCopy;
        case UPDATE_PAGE:
            stateCopy = {...state}
            stateCopy.isAuth = true
            stateCopy.briefUserInfo.name = getCookie('login')
            stateCopy.briefUserInfo.admin = action.admin === "1" ? 'администратор' : 'оператор'
            return stateCopy;
       default:
           return state;
   }
}

// export const delUser = (id) => ({type: DEL_USER, id: id })
const logIn = ({hash,login,admin}) => ({type: LOG_IN,hash,login,admin})
const updatePage = () => ({type: UPDATE_PAGE})
export const logInThunk = (logObj) => {
    return (dispatch) => {
        console.log(logObj)
        
        axios.post("php/users-form-processor.php",{"auth":logObj}).then(response => {
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result)
            dispatch(logIn(json.cookies));
            else alert('Ошибка авторизации, неверно введен пароль или логин')
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}


export const checkCookies = () => {
    return (dispatch) => {
       
        console.log( getCookie("hash"))
        
        axios.post("php/users-form-processor.php",{"upload":{
            login: getCookie("login"),
            hash: getCookie("hash")
        }}).then(response => {
            console.log(response.request)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result)
            dispatch(updatePage())
        
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    }
}


export default authReducer;