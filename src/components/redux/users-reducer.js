const ADD_USER = 'ADD_USER';

let initialState = 
            [{name: 'admin', admin: true},
            {name: 'user1', admin: false},
            {name: 'admin1', admin: true},
            {name: 'admin2', admin: true},
            {name: 'user2', admin: false}]
;

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
       case ADD_USER:
           let body = state.newMessageBody;
           state.newMessageBody = '';
           state.messages.push({id: 6, message: body});
           return state;
       default:
           return state;
   }
}


export default usersReducer;