const UPDATE_SETTINGS = 'UPDATE_NOTIFIC_SETTINGS';

let initialState = {
    from: "b@mail.ru",
    to: "a@mail.ru"
};

const notificSettingsReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_SETTINGS:
            state.from = action.from;
            state.to = action.to;
           return state;
       default:
           return state;
   }
}

export const updateActionCreator = ({from,to}) =>{
    return ({ type: UPDATE_SETTINGS, from: from, to: to })}

export default notificSettingsReducer;