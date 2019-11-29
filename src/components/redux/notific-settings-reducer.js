const UPDATE_FROM_TEXT = 'UPDATE_FROM_TEXT';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    from: "b@mail.ru",
    to: "a@mail.ru"
};

const notificSettingsReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_FROM_TEXT:
           console.log(action)
            state.from = action.newText;
           return state;
       case SEND_MESSAGE:
           return state;
       default:
           return state;
   }
}

export const updateToTextActionCreator = () => ({type: SEND_MESSAGE})
export const updateFromTextActionCreator = (text) =>
    ({ type: UPDATE_FROM_TEXT, newText: text })

export default notificSettingsReducer;