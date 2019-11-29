const UPDATE_TEXT_BODY = 'UPDATE_TEXT_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    ip: '192.168.3.xxx',
    mask: '255.255.255.xxx',
    gw: '192.168.3.xxx'
};

const netSettingsReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_TEXT_BODY:
           return state;
       case SEND_MESSAGE:
           return state;
       default:
           return state;
   }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) =>
    ({ type: UPDATE_TEXT_BODY, body: body })

export default netSettingsReducer;