const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    cameras: {
        events: 1000,
        exceptions: 9,
        errors: 0
    },
    acs: {
        events: 1100,
        exceptions: 406,
        errors: 0
    },
    iss: {
        events: 620,
        exceptions: 54,
        errors: 12
    },
    all: {
        exceptions: 469,
        errors: 12
    }
};

const headerReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_NEW_MESSAGE_BODY:
           return state;
       case SEND_MESSAGE:
           return state;
       default:
           return state;
   }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })

export default headerReducer;