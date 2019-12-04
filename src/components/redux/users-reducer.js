import { stat } from "fs";
import { isArray } from "util";

const ADD_USER = 'ADD_USER';
const DEL_USER = 'DEL_USER'

let initialState = 
            [{id: '0', name: 'admin', admin: true},
            { id: '1', name: 'user1', admin: false,},
            { id: '2', name: 'admin1', admin: true,},
            { id: '3', name: 'admin2', admin: true,},
            { id: '4', name: 'user2', admin: false,}]
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
            stateCopy = [...state,newUser]
            console.log(state)
            console.log(stateCopy)
            return stateCopy;
        case DEL_USER:
            console.log(action.id)
            stateCopy = {...state};
            
            stateCopy= state.filter(e => e.id!==action.id)
            return stateCopy
       default:
           return state;
   }
}

export const delUser = (id) => ({type: DEL_USER, id: id })

export const addUser = ({login, password_rep, password, admin}) =>
    ({ type: ADD_USER, login: login, password_rep: password_rep, password: password, admin: admin})

export default usersReducer;