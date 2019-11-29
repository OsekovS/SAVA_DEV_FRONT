const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    settings: { objects: ['Санаторий Звенигород',
        'Больница №46',
        'Детский сад "Яблочко"',
        'Офис'],
        endpoints:  [{
            object: 'Санаторий Звенигород',
            port: '6000',
            ip: '999.999.99.99',
        },
        {
            object: 'Больница №46',
            port: '6000',
            ip: '222.222.22.22',
        },
        {
            object: 'Детский сад "Яблочко"',
            port: '6000',
            ip: '777.77.77.777',
        }]},
        logs: 
        [{
            "time":"2019\/11\/06 12:53:11",
            "ip_cam":"192.168.3.109",
            "type":"Event",
            "comment":"Motion detect",
            "param":"2019-11-06 12:50:40"
        }]
};

const issReducer = (state = initialState, action) => {
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

export default issReducer;