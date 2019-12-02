import { stat } from "fs";
import { isArray } from "util";

const ADD_USER = 'ADD_USER';

let initialState = 
            [{name: 'admin', admin: true, id: 0},
            {name: 'user1', admin: false, id: 1},
            {name: 'admin1', admin: true, id: 2},
            {name: 'admin2', admin: true, id: 3},
            {name: 'user2', admin: false, id: 4}]
;

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
       case ADD_USER:
            let newUser = {
                id: state.length,
                name: action.login,
                admin:    action.admin === undefined ? false : action.admin
            };        
            return [...state,newUser];
       default:
           return state;
   }
}

export const addUseActionCreator = ({login,password,password_rep,admin}) =>{
    return ({ type: ADD_USER, login: login, password: password, password_rep: password_rep, admin: admin })}

export default usersReducer;